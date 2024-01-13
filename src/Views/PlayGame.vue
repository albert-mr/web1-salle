<script setup>
import TopBar from '../Components/NavBar.vue';
import Api from '../api/Api.js';
</script>

<template>
  <TopBar />
  <div class="CreateJoin-container">
    <button class="play-button" @click="handleJoin">Join Game</button>
    <button class="play-button" @click="handleCreate">Create Game</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleCreate() {
      this.$router.push('/create-game');
    },
    async handleJoin() {
      try {
        const response = await Api.getCurrentPlayerGames(this.$root.currentPlayer.token);
        const res = await response.json();
        if (res.error === undefined) {
          if(res.length === 1){
            this.$root.currentGame = res;
          }else{
            this.$root.currentGame = null;
          }
        } else {
          this.$root.currentGame = null;
          console.error(res.error.message);
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
      this.$router.push('/join-game');
    },
  },
};
</script>

<style>
.CreateJoin-container {
  width: 100%;
  height: 100vh;
  background: #4056A8;
  display: flex;
  justify-content: center;
  align-items: center;
}

.play-button {
  width: 25%;
  border-radius: 36px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-size: 60px;
  font-family: 'Sigmar One', sans-serif;
  font-weight: 400;
  border: 10px solid black;
  margin: 100px;
}

.play-button {
  background-color: #7F86CA;
}

.play-button:hover {
  background-color: #d9d9d9;
  color: black;
}

@media only screen and (max-width: 600px) {
  .play-button {
    width: 80%; 
    font-size: 17px; 
    margin: 10px; 
    text-align: center;
  }

  .CreateJoin-container {
  width: 120%;
  height: 120%;
  background: #4056A8;
  display: flex;
  justify-content: center;
  align-items: center;
}
}
</style>