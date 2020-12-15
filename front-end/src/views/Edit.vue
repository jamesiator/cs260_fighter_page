<template>
  <div>
    <div class="message" v-if="message">
      <h2>{{message}}</h2>
    </div>
    <div class="add">
      <h2>Add a Hero</h2>
      <p><input v-model="name" placeholder="Name"></p>
      <p><input v-model="race" placeholder="Race"></p>
      <p><input v-model="group" placeholder="Group/Alliance/Creed"></p>
      <p><input v-model="universe" placeholder="Universe"></p>
      <p><textarea v-model="description" placeholder="Description"></textarea></p>
      <p><input v-model="photoURL" placeholder="Photo (URL)"></p>
      <button @click="addFighter">Add Hero</button>
    </div>
    <hr>
    <div class="edit">
      <h2>Edit a Hero</h2>
      <input v-model="editFighterName" placeholder="Search for a Hero">
      <div class="suggestions" v-if="editFighterName.length > 0">
        <div class="suggestion" v-for="s in editSuggestions" :key="s._id" @click="selectFighter(s)">
          {{s.name}}
        </div>
      </div>
      <div class="editFighter" v-if="editFighter">
        <h2>{{editFighter.name}}</h2>
        <img :src="editFighter.photoURL" width="300px">
        <p><input v-model="editFighter.name" placeholder="Name"></p>
        <p><input v-model="editFighter.race" placeholder="Race"></p>
        <p><input v-model="editFighter.group" placeholder="Group/Alliance/Creed"></p>
        <p><input v-model="editFighter.universe" placeholder="Universe"></p>
        <p><textarea v-model="editFighter.description" placeholder="Description"></textarea></p>
        <p><input v-model="editFighter.photoURL" placeholder="Photo (URL)"></p>
        <button @click="updateFighter(editFighter)">Update</button>
      </div>
    </div>
    <hr>
    <div class="delete">
      <h2>Delete a Hero</h2>
      <div>
        <input v-model="deleteFighterName" placeholder="Search for a Hero">
        <div class="suggestions" v-if="deleteFighterName.length > 0">
          <div v-for="s in deleteSuggestions" :key="s._id" @click="removeFighter(s)">
            {{s.name}}
          </div>
        </div>
      </div>
      <div class="deleteFighter" v-if="deleteFighter">
        <img :src="deleteFighter.photoURL" width="300px">
        <h4>{{deleteFighter.name}}</h4>
        <button @click="deleteThisFighter(deleteFighter)">Delete Hero</button>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from 'axios';
  export default {
    name: 'Edit',
    data() {
      return {
        name: "",
        race: "",
        group: "",
        universe: "",
        description: "",
        photoURL: "",
        fighters: [],
        editFighterName: "",
        editFighter: null,
        deleteFighterName: "",
        deleteFighter: null,
        message: ""
      }
    },
    created() {
      this.getFighters();
    },
    methods: {
      async addFighter() {
        if (this.name === "") {
          this.message = "~ Cannot upload a hero with no name ~";
          return;
        }
        try {
          await axios.post("/api/fighters", {
            name: this.name,
            race: this.race,
            group: this.group,
            universe: this.universe,
            description: this.description,
            photoURL: this.photoURL
          });
          this.message = "~ Successfully uploaded " + this.name + " ~";
          this.name = "";
          this.race = "";
          this.group = "";
          this.universe = "";
          this.description = "";
          this.photoURL = "";
          this.getFighters();
        } catch (error) {
          console.log(error);
        }
      },
      async updateFighter(fighter) {
        try {
          await axios.put("/api/fighters/" + fighter._id, {
            name: this.editFighter.name,
            race: this.editFighter.race,
            group: this.editFighter.group,
            universe: this.editFighter.universe,
            description: this.editFighter.description,
            photoURL: this.editFighter.photoURL
          });
          this.message = "~ Successfully updated " + this.editFighter.name + " ~";
          this.editFighter = null;
          this.deleteFighter = null;
          this.getFighters();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async deleteThisFighter(fighter) {
        try {
          await axios.delete("/api/fighters/" + fighter._id);
          this.message = "~ Succesfully deleted " + this.deleteFighter.name + " ~";
          this.deleteFighter = null;
          this.editFighter = null;
          this.getFighters();
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      async getFighters() {
        try {
          let response = await axios.get("/api/fighters");
          this.fighters = response.data;
          return true;
        } catch (error) {
          console.log(error);
        }
      },
      selectFighter(fighter) {
        this.editFighter = fighter;
        this.editFighterName = "";
      },
      removeFighter(fighter) {
        this.deleteFighter = fighter;
        this.deleteFighterName = "";
      }
    },
    computed: {
      editSuggestions() {
        let fighters = this.fighters.filter(fighter => fighter.name.toLowerCase().startsWith(this.editFighterName.toLowerCase()));
        return fighters.sort((a,b) => a.name > b.name);
      },
      deleteSuggestions() {
        let fighters = this.fighters.filter(fighter => fighter.name.toLowerCase().startsWith(this.deleteFighterName.toLowerCase()));
        return fighters.sort((a,b) => a.name > b.name);
      }
    }
  }
</script>

<style scoped>
  .message {
    width: 70%;
    margin: auto;
    background: #b3b3b3;
    border-radius: 10px;
    padding: 5px;
  }
  .suggestions {
    margin-top: 5px;
  }
  .suggestion:hover {
    font-weight: bolder;
  }
  .add {
    padding: 20px;
  }
  .add input, textarea {
    width: 300px;
  }
  .add p {
    margin: 10px 0;
  }
  .edit {
    padding: 20px;
  }
  .edit input, textarea {
    width: 300px;
  }
  .edit p {
    margin: 5px;
  }
  .editFighter {
    margin-top: 20px;
  }
  .delete {
    padding: 20px;
  }
  .delete input {
    width: 300px;
  }

</style>
