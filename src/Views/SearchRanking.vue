<script setup>
import TopBar from '../Components/NavBar.vue';
import Api from '../api/Api.js';
</script>

<template>
  <TopBar />
  <div class="container-horizontal">
    <div class="container-vertical-1">
  <div class="Ranking-container">
    <button class="ranking-button" @click="handleRanking">Ranking</button>
    <div class="input-container">
      <div class="search-container">
        <div class="text-label">Search User</div>
        <input v-model="searchTerm" type="text" id="Username" placeholder="Username" class="input" />
        <div class="search-results">
          <div v-for="result in filteredPlayers" :key="result.player_ID" @click="selectResult(result)">
            {{ result.player_ID }}
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
<div class="container-vertical-2">
  <div class="container-horizontal-2">
        <div class="text44">Username: </div>
        <div class="text4">{{this.selectPlayer.player_ID}}</div>
      </div>
      <div class="container-horizontal-2">
        <div class="text44">Level: </div>
        <div class="text4">{{this.selectPlayer.level}}</div>
      </div>
      <div class="container-horizontal-2">
        <div class="text44">XP: </div>
        <div class="text4">{{this.selectPlayer.xp}}</div>
      </div>
      <div class="container-horizontal-2">
        <div class="text44">games_played: </div>
        <div class="text4">{{this.selectPlayerStats.games_played}}</div>
      </div>
      <div class="container-horizontal-2">
        <div class="text44">games_won: </div>
        <div class="text4">{{this.selectPlayerStats.games_won}}</div>
      </div>
</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      players: [],
      errorMessage: "",
      searchTerm: "",
      selectPlayer: {},
      selectPlayerStats: {},
    };
  },
  computed: {
    filteredPlayers() {
      return this.players.filter(player => player.player_ID.toLowerCase().includes(this.searchTerm.toLowerCase()));
    },
  },
  methods: {
    handleRanking() {
      this.$router.push('/ranking');
    },
    async getStats(id) {
      try {
        const response = await Api.getStatsFromAPlayer(this.$root.currentPlayer.token, id);
        const res = await response.json();

        if (res.error === undefined) {
          this.selectPlayerStats = res;
        } else {
          console.error(res.error.message);
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },
    async getPlayerInfo(id) {
      try {
        const response = await Api.getInfoFromAPlayer(this.$root.currentPlayer.token, id);
        const res = await response.json();

        if (res.error === undefined) {
          this.selectPlayer = res;
        } else {
          console.error(res.error.message);
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },
    async getall() {
      try {
        const response = await Api.listPlayers(this.$root.currentPlayer.token);
        const res = await response.json();

        if (res.error === undefined) {
          this.players = res;
        } else {
          console.error(res.error.message);
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },
    async selectResult(result) {
      await this.getPlayerInfo(result.player_ID);
      await this.getStats(result.player_ID);
    },
    
  },
  mounted() {
    this.getall();
  },
}
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

@media only screen and (max-width: 600px) {
  .Ranking-container {
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
@media only screen and (max-width: 600px) {
  .container-horizontal {
    width: 120%;
    height: 120%;
    background: #4056A8;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}
.container-horizontal-2 {
  width: 50%;
  height: 5%;
  background: #4056A8;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.text4 {
  color: #1E1E1E;
  font-size: 2vw;
  font-family: 'Sigmar One', sans-serif;
  font-weight: 400;
  margin-left: 40%;
  margin-bottom: 0%;
}
.text44 {
  color: #ffffff;
  font-size: 2vw;
  font-family: 'Sigmar One', sans-serif;
  font-weight: 400;
  margin-left: 40%;
  margin-bottom: 0%;
}

.container-horizontal {
  width: 100%;
  height: 100vh;
  background: #4056A8;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}
.container-vertical-1 {
  width: 100%;
  height: 100vh;
  background: #4056A8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}

.container-vertical-2 {
  width: 100%;
  height: 100vh;
  background: #4056A8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.Ranking-container {
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
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 0;
}

.search-container {
  position: relative;
  width: 100%;
}

.input, .ranking-button {
  width: 100%;
  height: 6%;
  background: #D9D9D9;
  border: 3px solid black;
  border-radius: 10px;
  color: #1E1E1E;
  font-size: 2vw;
  margin: 5% 0;
  padding: 5px;
  font-family: 'Sigmar One', sans-serif;
}

.ranking-button {
  width: 30%;
  border-radius: 36px;
  text-align: center;
  margin: 5% 10%;
  cursor: pointer;
}

.text-label {
  font-size: 3vw;
  color: #000000;
  margin-bottom: 5%;
}

.search-results {
  position: absolute;
  width: 100%;
  max-height: 150px;
  overflow-y: auto;
  background-color: #D9D9D9;
  border: 3px solid black;
  border-radius: 10px;
  margin-top: 5px;
}

.search-results div {
  padding: 5px;
  cursor: pointer;
  font-family: 'Sigmar One', sans-serif;
  transition: background-color 0.3s ease;
}

.search-results div:hover {
  background-color: #A9A9A9;
}
</style>
