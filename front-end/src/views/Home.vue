<template>
  <div class="home">
    <hr>
    <div v-for="fighter in fighters" :key="fighter._id">
      <div class="fighter">
        <div class="fighterPhoto">
          <img :src="fighter.photoURL">
        </div>
        <div class="fighterInfo">
          <h1>{{fighter.name}}</h1>
          <h3>{{fighter.group}}</h3>
          <h3><em>{{fighter.race}}</em></h3>
          <h3><em>from</em> {{fighter.universe}}</h3>
        </div>
      </div>
      <hr>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'Home',
  data() {
    return {
      fighters: [],
    }
  },
  created() {
    this.getFighters();
  },
  methods: {
    async getFighters() {
      try {
        let response = await axios.get("/api/fighters");
        this.fighters = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
}
</script>

<style scoped>
.home {
  width: 80%;
  margin: auto;
}
.fighter {
  width: 80%;
  margin: auto;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 8px 0;
}
.fighter div {
  //border: 1px solid blue;
}
.fighter img {
  width: 200px;
}
em {
  font-size: 0.8em;
}
</style>
