<script setup>

import TopBar from '../Components/NavBar.vue';
import Api from '../api/Api.js';
</script>

<template>
  <TopBar />
  <div class="container-horizontal">
    <div class="container-vertical-1">
      <button class="profile-button"></button>
      <img src="@/assets/profile.png" class="profile-image" />
      <div class="container-horizontal-2">
        <div class="text4">Username: </div>
        <div class="text4">{{this.$root.currentPlayer.player_ID}}</div>
      </div>
      <div class="container-horizontal-2">
        <div class="text4">Games Played: </div>
        <div class="text4">{{ gamesPlayed }}</div>
      </div>
      <div class="container-horizontal-2">
        <div class="text4">Games Won: </div>
        <div class="text4">{{ gamesWon }}</div>
      </div>
      <button class="button2" @click="handleDelete">Delete User</button>
    </div>
    <div class="container-vertical-2">
      <div class="text1">ATTACKS</div>
      <button class="equiped" @click="hadleEquiped">EQUIPED</button>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      gamesPlayed: 0,
      gamesWon: 0,
    };
  },
  mounted() {
    this.reloadPlayerInfo();
  },
  methods: {
    async deleteUser() {
      await Api.deleteUser(this.$root.currentPlayer.token)
      .then((response) => response.json())
                .then  ( async (res) => {
                    if (res.error == undefined) {
                    } else {
                        this.response = res.error.message;
                    }

                }).catch(error => {
                    this.response = "Lost API connection :(";
                    console.log(error);
                });
        },
    async handleDelete() {
      await this.deleteUser();
      this.$router.push('/');
    },
    async reloadPlayerInfo() {
      try {
        const response = await Api.getStats(this.$root.currentPlayer.token);
        const stats = await response.json();

        if (stats.error === undefined) {
          this.gamesPlayed = stats.games_played;
          this.gamesWon = stats.games_won;
        } else {
          console.error(stats.error.message);
        }
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },
    hadleEquiped() {
      this.$router.push('/store-sell');
    },
  },
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Shadows+Into+Light|Sigmar+One&display=swap');

@media only screen and (max-width: 600px) {
  .container-horizontal {
    width: 120%;
    height: 120%;
    background: #4056A8;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
}

.container-horizontal {
  width: 100%;
  height: 100vh;
  background: #4056A8;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.container-horizontal-2 {
  width: 50%;
  height: 100vh;
  background: #4056A8;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
}

.profile-image {
  width: 15vw;
  height: auto;
  object-fit: cover;
  margin-left: 7vw;
}


.container-vertical-1 {
  width: 100%;
  height: 100vh;
  background: #4056A8;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: left;
}

.container-vertical-2 {
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
  font-size: 2vw;
  font-family: 'Sigmar One', sans-serif;
  font-weight: 400;
}

.text3 {
  color: #1E1E1E;
  font-size: 2vw;
  font-family: 'Sigmar One', sans-serif;
  font-weight: 400;
  margin-left: 20%;
  margin-top: 4%;
}

.text4 {
  color: #1E1E1E;
  font-size: 2vw;
  font-family: 'Sigmar One', sans-serif;
  font-weight: 400;
  margin-left: 40%;
  margin-bottom: 6%;
}

.button {
  width: 50%;
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



.button2 {
  width: 50%;
  height: 6%;
  position: relative;
  background: #D9D9D9;
  border-radius: 36px;
  border: 3px black solid;
  font-size: 2vw;
  font-family: 'Sigmar One', sans-serif;
  color: #1E1E1E;
  margin: 5% 0;
  margin-left: 75%;

  cursor: pointer;
}

.equiped {
  width: 50%;
  height: 7%;
  position: relative;
  background: #D9D9D9;
  border-radius: 12px;
  border: 3px black solid;
  font-size: 2vw;
  font-family: 'Sigmar One', sans-serif;
  color: #1E1E1E;
  margin: 5% 0;

  cursor: pointer;
}

.profile-button {
      background: transparent;
      border: none;
      cursor: pointer;
    }
  
    .profile-button img {
      width: 5vw;
      height: 5vh;
      cursor: pointer;
      margin-bottom: 5%;
      margin-left: 4.3%; 
    }
</style>
