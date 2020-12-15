<template>
  <div class="duel">
    <h1>DUEL!!</h1>
    <div class="face-off">
      <div v-if="fighter1">
        <h1>{{fighter1.name}}</h1>
        <img :src="fighter1.photoURL">
      </div>
      <h1>VS</h1>
      <div v-if="fighter2">
        <h1>{{fighter2.name}}</h1>
        <img :src="fighter2.photoURL">
      </div>
    </div>
    <button v-show="showDuelButton" @click="doDuel">FIGHT!!</button>
    <div class="message" v-if="message">
      <h2>{{message}}</h2>
    </div>
    <button v-show="showDuelAgain" @click="resetDuel">Another Duel!</button>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Duel',
  data() {
    return {
      fighter1: null,
      fighter2: null,
      message: "",
      showDuelButton: true,
      showDuelAgain: false
    }
  },
  created() {
    this.getFighters();
  },
  methods: {
    async getFighters() {
      try {
        let response = await axios.get("/api/fighters");
        let number = Math.floor(Math.random() * Math.floor(response.data.length));
        this.fighter1 = response.data[number];
        let number2 = 0;
        while (number2 === number) {
          number2 = Math.floor(Math.random() * Math.floor(response.data.length));
        }
        this.fighter2 = response.data[number2];
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async doDuel() {
      try {
        let num = Math.floor(Math.random() * Math.floor(2));
        if (num) {
          this.message = this.fighter1.name + " wins!";
          //await axios.put("/api/win/"+this.fighter1.id);
          //await axios.put("/api/loss/"+this.fighter2.id);
        } else {
          this.message = this.fighter2.name + " wins!";
          //await axios.put("/api/win/"+this.fighter2.id);
          //await axios.put("/api/loss"+this.fighter1.id);
        }
        this.showDuelButton = false;
        this.showDuelAgain = true;
      } catch (error) {
        console.log(error);
      }
    },
    resetDuel() {
      this.fighter1 = null;
      this.fighter2 = null;
      this.message = "";
      this.getFighters();
      this.showDuelAgain = false;
      this.showDuelButton = true;
    }
  },
  computed: {
    emptyMessage() {
      return this.message === "";
    }
  }
}
</script>

<style scoped>
.duel {
  width: 90%;
  margin: auto;
}
.face-off {
  display: flex;
  justify-content: space-around;
  align-items: center;
}
img {
  width: 200px;
}
.message {
  margin: 20px;
}
</style>
