<script setup>
import TopBar from '../Components/NavBar.vue';
</script>

<template>
  <TopBar />
    <div class="mainPage-container">
        <div class="text3">Victory is just a click away</div>
        <img class="image" src="@/assets/arrow.png" />
        <button class="play-button"  @click="handlePlay">Play</button>
    </div>
</template>

<script>

  export default {
    
    methods: {
      handlePlay() {
        this.$router.push('/play');
      },
    },
  };
</script>


<style scoped>

@import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light|Sigmar+One&display=swap');

.mainPage-container {
  width: 100%;
  height: 90vh;
  background: #4056A8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  overflow-y: hidden;
}
.text3 {
    color: white;
    font-size: 4vw;
    font-family: 'Shadows Into Light', cursive;
    font-weight: 400;
  }

  .play-button {
  width: 30%;
  border-radius: 36px;
  text-align: center;
  cursor: pointer;
  color: white;
  font-size: 96px;
  font-family: 'Sigmar One', sans-serif;
  font-weight: 400;
  border: 10px solid black;
}

.play-button {
  background-color: #7F86CA;
}

.play-button:hover {
  background-color: #d9d9d9;
  color: black;
}

.image{
    width: 18%; 
    height: 20%; 
    transform-origin: 0 0;
}

@media only screen and (max-width: 600px) {
  .play-button {
    width: 30%; 
    font-size: 30px; 
    border: 5px solid black; 
  }

  .mainPage-container {
    width: 120%;
    height: 90vh;
    background: #4056A8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow-y: hidden;
}
}



</style>
