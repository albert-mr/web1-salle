<template>
  <TopBar />
  <div class="grid-container">
    <div v-for="row in gridRows" :key="row" class="grid-row">
      <div v-for="col in gridColumns" :key="col" class="grid-item">
        <div v-if="player1.x === col && player1.y === row" class="player player1"></div>
        <div v-else-if="player2.x === col && player2.y === row" class="player player2"></div>
        <div v-else-if="attackPosition.x === col && attackPosition.y === row && attackPosition.x !== null && attackPosition.y !== null" class="attack-position"></div>
        <div v-else class="blue-box"></div>
      </div>
    </div>
    <div class="logs-container">
    <div v-for="(log, index) in gameLogs" :key="index" class="log-item">
      <div class="log-date">{{ log.date_time }}</div>
      <div class="log-description">{{ log.description }}</div>
      <div class="log-playerID">Player ID: {{ log.player_ID }}</div>
    </div>
  </div>
  </div>
</template>

<script>
import TopBar from '../Components/NavBar.vue';
import Api from '../api/Api.js';

export default {
  components: {
    TopBar
  },
  data() {
    return {
      gridColumns: null,
      gridRows: null,
      player1: {
        x: null,
        y: null,
        lastDirection: null
      },
      player2: {
        x: null,
        y: null
      },
      attackPosition: {
        x: null,
        y: null
      },
      gameLogs: [],
      playerAttacks: [],
    };
  },
  methods: {
    async getAttacks() {
      try {
        const response = await Api.getAttacksFromTheUser(this.$root.currentPlayer.token);
        const res = await response.json();

        if (res.error === undefined) {
          return res;
        } else {
          console.error(res.error.message);
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },
    async fetchLogs(game_ID) {
    try {
      const response = await Api.getLogs(this.$root.currentPlayer.token, game_ID);
      const logs = await response.json();

      if (!logs.error) {
        this.gameLogs = logs;
      } else {
        console.error("Error fetching logs:", logs.error.message);
      }
    } catch (error) {
      console.error("Error in API call:", error);
    }
  },
    async getRandomAttackId() {
      const equippedAttacks = await this.getAttacks();

      if (equippedAttacks.length === 0) {
        return "fake-attack-id";
      }
      const randomIndex = Math.floor(Math.random() * equippedAttacks.length);
      return equippedAttacks[randomIndex].attack_ID;
    },
    async getCurrentGame() {
      try {
        const response = await Api.getCurrentPlayerGames(this.$root.currentPlayer.token);
        const res = await response.json();

        if (res.error === undefined && res.length > 0) {
          const currentGame = res[0];

          this.gridColumns = currentGame.size;
          this.gridRows = currentGame.size;

          const playersGames = currentGame.players_games;

          const player1Data = playersGames.find(p => p.player_ID === this.$root.currentPlayer.player_ID);

          const player2Data = playersGames.find(p => p.player_ID !== this.$root.currentPlayer.player_ID);

          if (player1Data) {
            this.player1.x = player1Data.x_game + 1;
            this.player1.y = player1Data.y_game + 1;
            this.player1.lastDirection = player1Data.direction;
          }

          if (player2Data) {
            this.player2.x = player2Data.x_game + 1;
            this.player2.y = player2Data.y_game + 1;
          }

          this.updateAttackPosition();
          await this.fetchLogs(this.$root.currentGame[0].game_ID);
        } else {
          this.$root.currentGame = null;
          if (res.error) {
            console.error(res.error.message);
          }
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },
    async move(message) {
      try {
        const attackId = await this.getRandomAttackId();
    
        const response = await Api.move(this.$root.currentPlayer.token, message, attackId);
        const res = await response.json();
        if (res.error === undefined) {
          this.$root.currentGames = res;
          this.handleGames();
        } else {
          this.response = res.error.message;
        }
      } catch (error) {
        this.response = "Lost API connection :(";
        console.log(error);
      }
    },
    async movePlayer(player, x, y, lastDirection) {
      if (x >= 0 && x < this.gridColumns && y >= 0 && y < this.gridRows &&
          !(x === this.player2.x && y === this.player2.y)) {
        const direction = this.getDirection(lastDirection);
        const response = await this.move(direction);
        const res = await response;
        if (res) {
          player.x = res.newX;
          player.y = res.newY;
          player.lastDirection = lastDirection;
          this.updateAttackPosition();
        }
      }
    },
    getDirection(lastDirection) {
      switch (lastDirection) {
        case 'left': return 'left';
        case 'right': return 'right';
        case 'up': return 'up';
        case 'down': return 'down';
        default: return '';
      }
    },
    handleKeyDown(event) {
      switch (event.key.toLowerCase()) {
        case 'a':
          this.movePlayer(this.player1, this.player1.x - 1, this.player1.y, 'left');
          break;
        case 'd':
          this.movePlayer(this.player1, this.player1.x + 1, this.player1.y, 'right');
          break;
        case 'w':
          this.movePlayer(this.player1, this.player1.x, this.player1.y - 1, 'up');
          break;
        case 's':
          this.movePlayer(this.player1, this.player1.x, this.player1.y + 1, 'down');
          break;
      }
    },
    updateAttackPosition() {
      if (this.player1.x === null || this.player1.y === null) {
        return;
      }

      let newX = this.player1.x;
      let newY = this.player1.y;

      switch (this.player1.lastDirection) {
        case 'left':
          newX = Math.max(0, this.player1.x - 1);
          break;
        case 'right':
          newX = Math.min(this.player1.x + 1, this.gridColumns - 1);
          break;
        case 'up':
          newY = Math.max(0, this.player1.y - 1);
          break;
        case 'down':
          newY = Math.min(this.player1.y + 1, this.gridRows - 1);
          break;
      }

      this.attackPosition.x = newX;
      this.attackPosition.y = newY;
    },
    startGameUpdates() {
      this.gameUpdateInterval = setInterval(() => {
        this.getCurrentGame();
      }, 5000);
    },
    stopGameUpdates() {
      clearInterval(this.gameUpdateInterval);
    }
  },
  mounted() {
    window.addEventListener('keydown', this.handleKeyDown);
    this.getCurrentGame();
    this.startGameUpdates();
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKeyDown);
    this.stopGameUpdates();
  }
};
</script>


<style scoped>
.grid-container {
  display: grid;
  grid-template-columns: repeat(var(--gridColumns), 1fr);
  width: min(50vw, 50vh);
  height: min(50vw, 50vh);
  margin: auto;
  margin-top: 10%;
  gap: 2%, 2%;
}

.grid-row {
  display: flex;
  flex: 1;
}

.grid-item {
  position: relative;
  flex: 1;
  aspect-ratio: 1;
  text-align: center;
  margin: 5px;
}

.blue-box {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #ffffff;
  border: 2px solid #000;
}

.player1 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: green;
  border: 2px solid #000;
}

.player2 {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: yellow;
  border: 2px solid #000000;
}

.attack-position {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: lightgreen;
  border: 2px solid #000;
}

.logs-container {
  min-height: 20vh;
  overflow-y: scroll;
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
}

.log-item {
  margin-bottom: 10px;
}

.log-date {
  font-size: 0.8em;
  color: #666;
}

.log-description {
  color: #333;
}

.log-playerID {
  font-size: 0.9em;
  color: #007bff;
}

</style>