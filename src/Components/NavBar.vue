<template>
  <header class="top-bar">
    <button class="header-button" @click="handleMain">TRAKIA</button>
    <div class="buttons">
      <button class="header-button" @click="handleGame">Games</button>
      <button class="header-button" @click="handleRanking">Ranking</button>
      <button class="header-button" @click="toggleStoreMenu">Attacks</button>
      <button class="profile-button" @click="handleProfile">
        <img src="@/assets/profile.png" alt="Profile Image" />
      </button>
    </div>
    <div v-if="showStoreMenu"  class="store-menu">
      <button class="menu-item" @click="handleSell">MyAttacks</button>
      <button class="menu-item" @click="handleBuy">Buy</button>
      <button class="menu-item" @click="handleCreate">Create</button>
    </div>
  </header>
</template>

<script>
import Api from '../api/Api.js';

export default {
  data() {
    return {
      showStoreMenu: false,
    };
  },
  methods: {

    async getAttacks() {
      try {
        const response = await Api.getBuyableAttacks(this.$root.currentPlayer.token);
        const res = await response.json();

        if (res.error === undefined) {
     
          this.$root.currentAttacks = res;
          this.$root.currentIndex = Math.floor(res.length/2);

          
          console.log(res);
          console.log(res.length);
          console.log(this.$root.currentIndex);
          
        } else {
          console.error(res.error.message);
        }
        
      } catch (error) {
        console.error("Lost API connection :(", error);
      }
    },

    toggleStoreMenu() {
      this.showStoreMenu = !this.showStoreMenu;
    },
    handleRanking() {
      this.$router.push('/search-ranking');
    },

    handleProfile() {
      this.$router.push('/user');
    },
    handleGame() {
      this.$router.push('/search-game');
    },
    handleMain() {
      this.$router.push('/main');
    },
    async handleBuy() {
      await this.getAttacks();
      this.$router.push('/store-buy');
    },
    handleSell() {
      this.$router.push('/store-sell');
    },
    handleCreate() {
      this.$router.push('/store-create');
    },
  },
};
</script>
  
  <style scoped>
    @media only screen and (max-width: 600px) {
        .top-bar {
          width: 120vw;
          height: 10vh;
          background: #D9D9D9;
          font-family: 'Sigmar One', sans-serif;
          border-bottom: 7px solid black;
          font-size: 5vw;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
    }
    .top-bar {
      height: 10vh;
      background: #D9D9D9;
      font-family: 'Sigmar One', sans-serif;
      border-bottom: 7px solid black;
      font-size: 5vw;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
  
    .buttons {
      display: flex;
      align-items: center;
    }
  
    .header-button {
      background: transparent;
      color: black;
      font-family: 'Sigmar One', sans-serif;
      font-size: 3vw;
      padding: 10px 20px;
      border: none;
      cursor: pointer;
      margin-left: 10px;
      margin-right: 10px;
    }
  
    .profile-button {
      background: transparent;
      border: none;
      cursor: pointer;
    }
  
    .profile-button img {
      width: 5vw;
      height: auto;
      cursor: pointer;
    }
  
    .header-button:hover {
      color: #4056A8;
    }

    .store-menu {
    position: absolute;
    top: 0;
    right: 0;
    background: #D9D9D9;
    border: 1px solid #000;
    display: flex;
    flex-direction: column;
    z-index: 1;
    margin-top: 9%;
    margin-right: 1%;
  }

  .menu-item {
    background: transparent;
    color: black;
    font-family: 'Sigmar One', sans-serif;
    font-size: 3vw;
    padding: 10px 20px;
    border: none;
    cursor: pointer;
  }

  .menu-item:hover {
    background: #4056A8;
    color: white;
  }
  </style>
  