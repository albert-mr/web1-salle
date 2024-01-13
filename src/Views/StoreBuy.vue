<script setup>
import TopBar from '../Components/NavBar.vue';
</script>

<template>
  <TopBar />
  <div class="progress-container">
      <div class="progress-bar" :style="{ left: progressBarLeft }"></div>
    </div>
  <div class="sell-container">
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
    <form class="input-container">
      <div class="text" id="attackName">{{ this.$root.currentAttacks[this.$root.currentIndex].attack_ID }}</div>
      <div class="text" id="direction">{{ this.$root.currentAttacks[this.$root.currentIndex].positions }}</div>
      <div class="text" id="attackPower">{{ this.$root.currentAttacks[this.$root.currentIndex].power }}</div>
      <div class="text" id="levelNeeded">{{ this.$root.currentAttacks[this.$root.currentIndex].level_needed }}</div>
      <div class="text" id="attackPrice">{{ this.$root.currentAttacks[this.$root.currentIndex].price }}</div>
      <div class="arrows">
        <button id="left" class="arrowButton" @click.prevent="handleLeftClick()">←</button>
        <button id="right" class="arrowButton" @click.prevent="handleRightClick()">→</button>
      </div>
    </form>
    <button class="buyButton" @click.prevent="handleBuyClick()">Buy</button>
  </div>
</template>

<script>
import Api from '../api/Api.js';

export default {
  data() {
    return {
      successMessage: "",
      errorMessage: "",
      progressBarLeft: '0%',
    };
  },

  methods: {
    async getAttacks() {
      try {
        const response = await Api.getBuyableAttacks(this.$root.currentPlayer.token);
        const res = await response.json();

        if (res.error === undefined) {
          this.$root.currentAttacks = res;
          this.$root.currentIndex = Math.floor(res.length / 2);
        } else {
          console.error(res.error.message);
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },

    handleLeftClick() {
      if (this.$root.currentIndex > 0) {
        this.$root.currentIndex--;
      } else {
        this.errorMessage = "Limit left reached";
      }
    },

    handleRightClick() {
      if (this.$root.currentIndex < this.$root.currentAttacks.length - 1) {
        this.$root.currentIndex++;
      } else {
        this.errorMessage = "Limit right reached";
      }
    },

    async handleBuyClick() {
      try {
        const response = await Api.buyAttack(
          this.$root.currentPlayer.token,
          this.$root.currentAttacks[this.$root.currentIndex].attack_ID
        );
        if (response.ok) {
          this.successMessage = "Attack Bought!";
          this.getAttacks();
          this.clearSuccessMessage();
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

    clearSuccessMessage() {
      setTimeout(() => {
        this.successMessage = "";
      }, 3000);
    },

    updateProgressBar() {
      const currentIndex = this.$root.currentIndex;
      const totalAttacks = this.$root.currentAttacks.length;
      const percent = (currentIndex / (totalAttacks - 1)) * 100;
      this.progressBarLeft = percent + '%';
    },
  },

  watch: {
    '$root.currentIndex': 'updateProgressBar',
  },
};
</script>




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

.buyButton {
  height: 6%;
  background: #D9D9D9;
  border: 3px solid black;
  color: #1E1E1E;
  font-size: 2vw;
  margin: 5% 0;
  padding: 5px;
  width: 30%;
  border-radius: 36px;
  text-align: center;
  margin: 5% 10%;
  cursor: pointer;
  font-family: 'Sigmar One', sans-serif;
}


body {
  margin: 0;
  padding: 0;
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
  height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: flex-center;
  justify-content: space-between;
  background: #D9D9D9;
  border-radius: 10px;
  padding: 20px;
}

.input-title {
  color: black;
  font-family: 'Sigmar One', sans-serif;
  font-size: 3vw;
  padding: 10px 20px;
  border: none;
  text-align: left;
}

.input-centered {
  color: black;
  font-family: 'Sigmar One', sans-serif;
  font-size: 3vw;
  padding: 10px 20px;
  border: none;
  text-align: center;
}

.arrows {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 3vw;
  font-weight: bold;
}

.arrow-left, .arrow-right {
  cursor: pointer;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 5px;
  animation: fadeOut 5s forwards;
}

.success-message {
  color: green;
  text-align: center;
  margin-top: 5px;
  animation: fadeOut 5s forwards;
}

@keyframes fadeOut {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}


.progress-container {
  width: 100%;
  height: 10px;
  position: relative;
  background: #D9D9D9;
  border-radius: 5px;
  margin-top: 10px;
}

.progress-bar {
  height: 100%;
  width: 10px;
  background: green;
  border-radius: 5px;
  position: absolute;
  top: 0;
  transition: left 0.5s ease-in-out;
}
</style>