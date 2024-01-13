<script setup>
import TopBar from '../Components/NavBar.vue';
import Api from '../api/Api.js';
</script>

<script>
export default {
  data() {
    return {
      games: [],
      currentPlayerGames: [],
      errorMessage: "",
      currentGameTitle: "",
    };
  },
  mounted() {
    this.getall();
  },
  methods: {
    async getall() {
      try {
        const response = await Api.listGames(this.$root.currentPlayer.token);
        const res = await response.json();

        if (res.error === undefined) {
          this.games = await res.filter(game => !game.finished);
          
          console.log(this.games);
          console.log(this.$root.currentGame);
          if (this.$root.currentGame != null) {
            console.log("Current Game:", this.$root.currentGame);
            this.currentGameTitle = `Current Game: ${this.$root.currentGame[0].game_ID}`;
          } else {
            this.currentGameTitle = "No Current Game";
          }
        } else {
          console.error(res.error.message);
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },


    async joinThisGame(game) {
      console.log("Clicked on Game ID:", game.game_ID);
      try {
        const response = await Api.joinGame(this.$root.currentPlayer.token, game.game_ID);
        if (response.ok) {
          console.log("Joined game!");
          
          this.$router.push('/grid');
         
        } else {
          const res = await response.json();
          console.error(res.error.message);
          this.errorMessage = res.error.message;
          this.clearErrorMessage();
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },

    async leaveThisGame(gameId) {
      console.log("Clicked on Game ID:", gameId);
      try {
        const response = await Api.leaveGame(this.$root.currentPlayer.token, gameId);
        if (response.ok) {
          console.log("Left game!");
          
        } else {
          const res = await response.json();
          console.error(res.error.message);
          this.errorMessage = res.error.message;
          this.clearErrorMessage();
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },

    clearErrorMessage() {
      setTimeout(() => {
        this.errorMessage = "";
      }, 3000);
    },
  }
}
</script>

<template>
  <TopBar />
  <div class="sell-container">
    <div class="input-title">List of Available Games</div>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div class="input-container">
      <table class="top-aligned-table">
        <thead>
          <tr> 
            <th>Game ID</th>
            <th>Size</th>
            <th>HP Max</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in games" :key="index">
            <td>{{ game.game_ID }}</td>
            <td>{{ game.size }}</td>
            <td>{{ game.HP_max }}</td>
            
            <td>
              <button @click="joinThisGame(game)">JOIN</button>
              <button @click="leaveThisGame(game.game_ID)">LEAVE</button>
            </td>
          </tr>
        </tbody>

      </table>
    </div>

    <div class="current-game-section">
        <div class="input-title">{{ currentGameTitle }}</div>

        <button class="go-to-grid-button" @click="$router.push('/grid')">Go to Grid</button>
      </div>
    
  </div>
</template>

<style scoped>


@media only screen and (max-width: 600px) {
  .sell-container {
    min-height: 120%;
    width: 120%;
    background: #4056A8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: 'Sigmar One', sans-serif;
  }
}

.sell-container {
  min-height: 100vh;
  background: #4056A8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: 'Sigmar One', sans-serif;
}

.input-container {
  width: 75%;
  height: 50vh;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: #D9D9D9;
  border-radius: 10px;
  padding: 20px;
}

.top-aligned-table {
  align-self: flex-start;
  width: 100%;
  table-layout: fixed;
}

.current-game-section {
  margin-top: 20px;
  text-align: center;
}

th, td {
  width: 20%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  border: 1px solid black;
  padding: 8px;
}

.input-title {
  color: black;
  font-family: 'Sigmar One', sans-serif;
  font-size: 3vw;
  padding: 10px 20px;
  border: none;
  text-align: center;
}

.current-game {
  background-color: green;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 5px;
  animation: fadeOut 3s forwards;
}
.go-to-grid-button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 10px 20px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.go-to-grid-button:hover {
  background-color: #45a049;
}
@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>