<script setup>
import TopBar from '../Components/NavBar.vue';
import Api from '../api/Api.js';
</script>

<template>
  <TopBar />
  <div class="sell-container">
    <div class="input-title">List of Your Attacks</div>

    <div class="input-container">
      <table class="top-aligned-table">
        <thead class="sticky-header">
          <tr>
            <th>Attack_ID</th>
            <th>Positions</th>
            <th>Power</th>
            <th>
              <form class="input2-container">
                <input type="text" id="price" placeholder="Price" v-model="price" />
              </form>
            </th>
            <th>Equip</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(attack, index) in filteredAttacks"
            :key="index"
            :class="{ 'current-attack': attack.equipped }"
          >
            <td>{{ attack.attack_ID }}</td>
            <td>{{ attack.positions }}</td>
            <td>{{ attack.power }}</td>
            <td>
              <button @click="sellIt(attack.attack_ID, price)">SELL</button>
            </td>
            <td>
              <button @click="equipIt(attack.attack_ID)">EQUIP</button>
              <button @click="unequipIt(attack.attack_ID)">UNEQUIP</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <div v-if="errorMessage" class="error-message">{{ errorMessage }}</div>
    <div v-if="successMessage" class="success-message">{{ successMessage }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      attacks: [],
      errorMessage: "",
      successMessage: "",
      price: "",
    };
  },
  computed: {
    filteredAttacks() {
      return this.attacks.filter(attack => !attack.on_sale);
    },
  },
  mounted() {
    this.getall();
  },
  methods: {
    async getall() {
      try {
        const response = await Api.getAttacksFromTheUser(this.$root.currentPlayer.token);
        const res = await response.json();

        if (res.error === undefined) {
          this.attacks = res;
        } else {
          console.error(res.error.message);
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
      }, 2000);
    },
    async sellIt(attackIdentifier, price) {
      try {
        const response = await Api.sellAttack(this.$root.currentPlayer.token, attackIdentifier, price);
        if (response.ok) {
          this.successMessage = "Attack is now available at the Black Market";
          this.getall();
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
    async equipIt(attackIdentifier) {
      try {
        const response = await Api.equip(this.$root.currentPlayer.token, attackIdentifier);
        if (response.ok) {
          this.successMessage = "Equipped successfully!";
          this.getall();
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
    async unequipIt(attackIdentifier) {
      try {
        const response = await Api.unEquip(this.$root.currentPlayer.token, attackIdentifier);
        if (response.ok) {
          this.successMessage = "Unequipped successfully!";
          this.getall();
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
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
}

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
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  background: #D9D9D9;
  border-radius: 10px;
  padding: 20px;
}

.top-aligned-table {
  align-self: flex-start;
  width: 100%;
  table-layout: fixed;
}

thead.sticky-header {
  position: sticky;
  top: 0;
  background-color: #D9D9D9;
}

th, td {
  width: 20%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  text-align: center;
  border: 1px solid black;
  padding: 8px;
}

.input-title {
  color: black;
  font-family: 'Sigmar One', sans-serif;
  font-size: 3vw;
  padding: 10px 20px;
  border: none;
  text-align: center;
}

.current-attack {
  background-color: green;
}

.error-message {
  color: red;
  text-align: center;
  margin-top: 5px;
  animation: fadeOut 3s forwards;
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
