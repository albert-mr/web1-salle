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
          this.games = res;
          this.getCurrentGames();
        } else {
          console.error(res.error.message);
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },

    async getCurrentGames() {
      try {
        const response = await Api.getCurrentPlayerGames(this.$root.currentPlayer.token);
        const res = await response.json();

        if (res.error === undefined) {
          this.currentPlayerGames = res;
        } else {
          console.error(res.error.message);
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },
  }
}
</script>

<template>
  <TopBar />
  <div class="sell-container">
    <div class="input-title">List of Games</div>
    <div class="input-container">
      
      <table class="top-aligned-table">
        <thead>
          <tr> 
            <th>Game ID</th>
            <th>Size</th>
            <th>Creation Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(game, index) in games" :key="index" :class="{ 'current-game': currentPlayerGames.some(currentGame => currentGame.game_ID === game.game_ID) }">
            <td>{{ game.game_ID }}</td>
            <td>{{ game.size }}</td>
            <td>{{ game.creation_date }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>

body {
  margin: 0;
  padding: 0;
}

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
  border-collapse: collapse;
}

th, td {
  width: 33.33%;
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
</style>
