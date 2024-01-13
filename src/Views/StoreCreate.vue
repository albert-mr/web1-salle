
<script setup>
import TopBar from '../Components/NavBar.vue';
import Api from '../api/Api.js';
</script>
<template>
  <TopBar />
  <div class="create-container">
    
    <form class="input-container">
      <input type="text" id="attack_id" placeholder="attack_id (max 21 chars)" v-model="attack_id" />
      <input type="text" id="positions" placeholder="positions format: (x,y)" v-model="positions" />
      <input type="text" id="img" placeholder="img" v-model="img" />
      <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    </form>
    <button class="create-button" @click="handleCreate">Create</button>
  </div>
</template>

<script>
export default {
  data() {
        return {
          attack_id: "",
          positions: "",
          img: "",
          errorMessage: "",
          successMessage: "",
            
        }
    },
  methods: {
    async handleCreate() {
      try {
        const response = await Api.createAttack(this.$root.currentPlayer.token, this.attack_id, this.positions, this.img);
        if (response.ok) {
          this.successMessage = "Attack created!";
          this.clearSuccessMessage();
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
    clearSuccessMessage() {
      setTimeout(() => {
        this.successMessage = "";
      }, 2000);
    },
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

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

.success-message {
  color: rgb(4, 85, 4);
  text-align: center;
  margin-top: 5px;
  animation: fadeOut 3s forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
}
</style>
