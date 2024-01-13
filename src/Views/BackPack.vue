<script setup>
import TopBar from '../Components/NavBar.vue';
</script>

<template>
  <TopBar />
  <div class="sell-container">

    <div class="text3">Backpack</div>
    <div class="input-container">
      <div class="input-title">Name</div>
      <div class="input-title">Direction</div>
      <div class="input-title">Power</div>
      <div class="arrows">
        <div class="arrow-left">←</div>
        <div class="arrow-right">→</div>
      </div>
    </div>

    <button class="login-button">Equip</button>
  </div>
</template>

<style scoped>

.text3 {
    color: white;
    font-size: 4vw;
    font-family: 'Shadows Into Light', cursive;
    font-weight: 400;
    margin-bottom: 2%;
  }

.login-button {
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

@media only screen and (max-width: 600px) {
  .sell-container {
    min-height: 120vh;
    width: 200%;
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
</style>
