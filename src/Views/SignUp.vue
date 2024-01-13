<script>
export default {
  data() {
    return {
      username: "",
      password: "",
      image: "",
      errorMessage: "",
      showError: false,
    };
  },
  methods: {
    handleSignUp() {
      this.$router.push('/');
    },
    register() {
      const createUserRequest = { player_ID: this.username, password: this.password, img: this.image };
      fetch("https://balandrau.salle.url.edu/i3/players", {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(createUserRequest)
      }).then((response) => {
        if (response.ok) {
          this.response = "Player created!";
          this.handleSignUp();
          return response;
        }

        return response.json();
      }).then((res) => {
        if (res.ok == undefined) {
          this.response = res.error.message;
          this.errorMessage = res.error.message;
          this.showError = true;
          setTimeout(() => {
            this.errorMessage = "";
            this.showError = false;
          }, 2000);
        }
      }).catch((error) => {
        this.response = "No connection with API";
        console.log(error);
      });
    },
  },
};
</script>

<template>
  <header class="top-bar">TRAKIA</header>
  <div :class="{ shake: showError }">
    <div class="signup-container">
      <form class="input-container">
        <input type="text" id="username" placeholder="Username" name="username" v-model="username" />
        <input type="password" id="password" placeholder="Password" name="password" v-model="password" />
        <input type="text" id="password" placeholder="Image URL" name="image" v-model="image" />
        <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
      </form>
      <button class="signup-button" v-on:click.prevent="register()">Sign Up</button>
    </div>
  </div>
</template>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

@media only screen and (max-width: 600px) {
  .signup-container {
    min-height: 100vh;
    background: #4056A8;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: relative;
    font-family: 'Sigmar One', sans-serif;
  }
}

.signup-container {
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
  width: 100%;
  background: #D9D9D9;
  border-bottom: 7px solid black;
  text-align: center;
  font-family: 'Sigmar One', sans-serif;
  color: #1E1E1E;
  font-size: 5vw;
  display: flex;
  justify-content: center;
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

.input,
.signup-button {
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

.signup-button {
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
  animation: flashAndFadeOut 2s forwards;
}

@keyframes flashAndFadeOut {
  0%, 5%, 10%, 15%, 20%, 25%, 30%, 35%, 40%, 45%, 50%, 55%, 60%, 65%, 70%, 75%, 80%, 85%, 90%, 95%, 100% {
    opacity: 1;
  }
  2.5%, 7.5%, 12.5%, 17.5%, 22.5%, 27.5%, 32.5%, 37.5%, 42.5%, 47.5%, 52.5%, 57.5%, 62.5%, 67.5%, 72.5%, 77.5%, 82.5%, 87.5%, 92.5%, 97.5% {
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
