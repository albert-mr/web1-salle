<template>
  <div class="container">
    <div class="text1">GET SET FOR THE ACTION</div>
    <div class="text2">TRAKIA</div>
    <button class="button"  @click="handleSignUp">Sign Up</button>
    <button class="button" @click="handleLogIn">Log In</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleSignUp() {
      this.$router.push('/signup');
    },
    handleLogIn() {
      this.$router.push('/login');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light|Sigmar+One&display=swap');

@media only screen and (max-width: 600px) {
  .container {
    width: 120%;
    height: 120%;
    background: #4056A8;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}

.container {
  width: 100%;
  height: 100vh;
  background: #4056A8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.text1 {
  color: white;
  font-size: 4vw;
  font-family: 'Shadows Into Light', cursive;
  font-weight: 400;
}

.text2 {
  color: #1E1E1E;
  font-size: 4vw;
  font-family: 'Sigmar One', sans-serif;
  font-weight: 400;
}

.button {
  width: 30%;
  height: 6%;
  position: relative;
  background: #D9D9D9;
  border-radius: 36px;
  border: 3px black solid;
  font-size: 2vw;
  font-family: 'Sigmar One', sans-serif;
  color: #1E1E1E;
  margin: 5% 0;

  cursor: pointer;
}

</style>
