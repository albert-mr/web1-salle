<template>
  <div class="login-container">
    <header class="top-bar">TRAKIA</header>
    <div :class="{ shake: showError }">
      <form class="input-container">
        <input type="text" id="username" placeholder="Username" v-model="username" />
        <input type="password" id="password" placeholder="Password" v-model="password" />
        
      </form>
    </div>
    <button class="login-button" v-on:click.prevent="login()">Log in</button>
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
  </div>
</template>

<script>
import Api from '../api/Api.js';

export default {
  data() {
    return {
      username: "",
      password: "",
      response: "",
      errorMessage: "",
      showError: false,
    };
  },
  methods: {
    handleSignUp() {
      this.$router.push('/main');
    },
    login() {
      Api.login(this.username, this.password)
        .then((response) => response.json())
        .then((res) => {
          if (res.error == undefined) {
            this.response = "Token: " + res.token;
            this.$root.currentPlayer = res;
            this.handleSignUp();
          } else {
            this.response = res.error.message;
            this.errorMessage = "Incorrect Log In";
            this.showError = true;
            setTimeout(() => {
              this.errorMessage = "";
              this.showError = false;
            }, 3000);
          }
        })
        .catch((error) => {
          this.response = "Lost API connection :(";
          console.log(error);
        });
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
  .login-container {
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

.login-container {
  min-height: 100vh;
  background: #4056A8;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: 'Sigmar One', sans-serif;
}

.top-bar {
  height: 10%;
  background: #D9D9D9;
  border-bottom: 7px solid black;
  text-align: center;
  color: #1E1E1E;
  font-size: 3vw;
  display: flex;
  align-items: center;
  padding: 0 2%;
}

.input-container {
  width: 40%;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 5% 0;
}

.input, .login-button {
  width: 100%;
  height: 6%;
  background: #D9D9D9;
  border: 3px solid black;
  border-radius: 10px;
  color: #1E1E1E;
  font-size: 2vw;
  margin: 5% 0;
  padding: 5px;
}

.login-button {
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

.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
}

@keyframes shake {
  10%, 90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%, 80% {
    transform: translate3d(2px, 0, 0);
  }

  30%, 50%, 70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%, 60% {
    transform: translate3d(4px, 0, 0);
  }
}

</style>
