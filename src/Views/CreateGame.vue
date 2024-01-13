
<script setup>
import TopBar from '../Components/NavBar.vue';
import Api from '../api/Api.js';
</script>
<template>
  <TopBar />
  <div class="create-container">
    <div class="text3">CREATE GAME</div>
    <div class="text2">Nº rows/Columns [x,y]</div>
    <form class="input-container">
      <input type="text" id="game_ID" placeholder="game_ID (max 21 chars)" v-model="game_ID" />
      <input type="text" id="size" placeholder="size (values: [2..10])" v-model="size" />
      <input type="text" id="HP_max" placeholder="HP_max (min: 15)" v-model="HP_max" />
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    </form>
    <button class="create-button" @click="handleCreate">Create</button>
  </div>
</template>

<script>
export default {
  data() {
        return {
            game_ID: "",
            size: null,
            HP_max: null,
            errorMessage: "",
            
        }
    },
  methods: {
    async handleCreate() {
      try {
        const response = await Api.createGame(this.$root.currentPlayer.token, this.game_ID, Number(this.size), Number(this.HP_max));
        if (response.ok) {
          console.log("Game created!");
          this.$router.push('/grid');
        } else {
          const res = await response.json();
          console.error(res.error.message);
          this.errorMessage = res.error.message;
                      setTimeout(() => {
                        this.errorMessage = "";
                      }, 3000);
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },
  },
};
</script>

<style scoped>

@media only screen and (max-width: 600px) {
  .create-container {
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

body {
  margin: 0;
  padding: 0;
}

.text2{
    color: #1E1E1E;
    font-family: Sigmar One;
    font-size: 36px;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
}
.text3 {
    color: white;
    font-size: 4vw;
    font-family: 'Shadows Into Light', cursive;
    font-weight: 400;
    margin-bottom: 0;
  }

.create-container {
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
  font-family: 'Sigmar One', sans-serif;
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 0;
}

.input, .create-button {
  width: 100%;
  height: 6%;
  background: #D9D9D9;
  border: 3px solid black;
  border-radius: 10px;
  color: #1E1E1E;
  font-size: 2vw;
  margin: 5% 0;
  font-family: 'Sigmar One', sans-serif;
  padding: 5px;
}

.create-button {
  width: 30%;
  border-radius: 36px;
  text-align: center;
  margin: 5% 10%;
  cursor: pointer;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 5px;
  animation: fadeOut 3s forwards;
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
