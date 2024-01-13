<template>
  <router-view/>
</template>


<style>
#app, html, body, :root {
  top : 0;
  left : 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
<script>
export default {
  data() {
        return {
          currentPlayer: {},

          currentGames: {},

          currentAttacks: [],

          currentIndex: 0,

        }
    },
  }
</script>