
<script setup>
import TopBar from '../Components/NavBar.vue';
</script>

<template>
  <TopBar />
  <div class="GamesMain-container">
    <button class="ranking-button" @click="getall">All Games</button>
  </div>
</template>

<script>
import Api from '../api/Api.js';
export default {
  
  methods: {
    handleGames() {
      this.$router.push('/games');

    },
    getall() {
      Api.listGames(this.$root.currentPlayer.token)
      .then((response) => response.json())
                .then((res) => {
                    if (res.error == undefined) {
                        
                        console.log(res);
                        this.$root.currentGames = res;
                        this.handleGames()


                    } else {
                        this.response = res.error.message;
                    }

                }).catch(error => {
                    this.response = "Lost API connection :(";
                    console.log(error);
                });
        }
  },
};
</script >

<style scoped>
body {
  margin: 0;
  padding: 0;
}

@media only screen and (max-width: 600px) {
  .GamesMain-container {
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

.GamesMain-container {
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
</style>
