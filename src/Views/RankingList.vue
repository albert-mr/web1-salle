<script setup>
import TopBar from '../Components/NavBar.vue';
import Api from '../api/Api.js';
</script>

<script>
export default {
  data() {
    return {
      players: [],
      errorMessage: "",
    };
  },
  mounted() {
    this.getall();
  },
  methods: {
    async getall() {
      try {
        const response = await Api.listPlayers(this.$root.currentPlayer.token);
        const res = await response.json();

        if (res.error === undefined) {
          console.log(res);
          console.log(res[0]);
          this.players = res;
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
    <div class="input-title">List of Players</div>
    <div class="input-container">
      
      <table class="bordered-table">
        <thead>
          <tr> 
            <th>player_ID</th>
            <th>img</th>
            <th>xp</th>
            <th>level</th>
            <th>coins</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(player, index) in players" :key="player.player_ID" :class="{ 'golden-row': index === 0 , 'silver-row': index === 1, 'bronze-row': index === 2  }">
            <td>{{ player.player_ID }}</td>
            <td>{{ player.img }}</td>
            <td>{{ player.xp }}</td>
            <td>{{ player.level }}</td>
            <td>{{ player.coins }}</td>
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
  align-items: flex-center;
  justify-content: space-between;
  background: #D9D9D9;
  border-radius: 10px;
  padding: 20px;
}

table {
  width: 100%;
  table-layout: fixed;
  border-collapse: collapse;
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

tbody tr:nth-child(1) {
  background-color: gold;
}

tbody tr:nth-child(2) {
  background-color: silver;
}

tbody tr:nth-child(3) {
  background-color: #cd7f32;
}

.golden-row {
  animation: highlightGoldenRow 1.5s infinite alternate; 
}

.silver-row {
  animation: highlightSilverRow 1.5s infinite alternate; 
}

.bronze-row {
  animation: highlightBronzeRow 1.5s infinite alternate; 
}

@keyframes highlightGoldenRow {
  from {
    background-color: rgb(200, 171, 3);
  }
  to {
    background-color: rgb(243, 243, 124);
  }
}

@keyframes highlightSilverRow {
  from {
    background-color: rgb(133, 128, 128);
  }
  to {
    background-color: lightgray;
  }
}

@keyframes highlightBronzeRow {
  from {
    background-color: #804f1e;
  }
  to {
    background-color: #cd7f32;
  }
}

.input-title {
  color: black;
  font-family: 'Sigmar One', sans-serif;
  font-size: 3vw;
  padding: 10px 20px;
  border: none;
  text-align: center;
}
</style>
