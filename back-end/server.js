const express = require('express');
const bodyParser = require('body-parser');
const mongo = require('mongoose');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

const fighterSchema = new mongo.Schema({
  name: String,
  race: String,
  group: String,
  universe: String,
  description: String,
  //wins: "int",
  //losses: "int",
  photoURL: String
});

const Fighter = mongo.model('fighter', fighterSchema);

mongo.connect('mongodb://localhost:27017/fighters', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

//uppload a new fighter
app.post('/api/fighters', async (req,res) => {
  const fighter = new Fighter({
    name: req.body.name,
    race: req.body.race,
    group: req.body.group,
    universe: req.body.universe,
    description: req.body.description,
    //wins: 0,
    //losses: 0,
    photoURL: req.body.photoURL
  });
  try {
    await fighter.save();
    res.send(fighter);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//get a specific fighter
app.get('/api/fighters/:id', async (req,res) => {
  try {
    let fighter = await Fighter.findOne({
      _id: req.params.id
    });
    res.send(fighter);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//get a list of all the fighters
app.get('/api/fighters', async (req,res) => {
    try {
      let fighters = await Fighter.find();
      res.send(fighters);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
});

//update a fighter's win count
app.put('/api/win/:id', async (req,res) => {
  try {
    let fighter = await Fighter.findOne({
      _id: req.params.id
    });
    fighter.wins = fighter.wins + 1;
    fighter.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//update a fighter's loss count
app.put('/api/loss/:id', async (req,res) => {
  try {
    let fighter = await Fighter.findOne({
      _id: req.params.id
    });
    fighter.losses = fighter.losses + 1;
    fighter.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//delete a fighter and its data
app.delete('/api/fighters/:id', async (req,res) => {
  try {
    await Fighter.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

//edit a fighter's data
app.put('/api/fighters/:id', async (req,res) => {
  try {
    let fighter = await Fighter.findOne({
      _id: req.params.id
    });
    fighter.name = req.body.name;
    fighter.race = req.body.race;
    fighter.group = req.body.group;
    fighter.universe = req.body.universe;
    fighter.description = req.body.description;
    fighter.photoURL = req.body.photoURL;
    fighter.save();
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(3001, () => console.log('Listening on port 3001'));
