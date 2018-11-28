const express = require('express');
const axios =require('axios');  
const app = express();
const mongo = require('./mongo');
const cors = require('cors');
const port = process.env.PORT || 5000;
app.use(cors());
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept'
  );
  next();
});

var ability1;
var ability2;
var pokename;
var pokeindex;
var pokeimage;


app.post('/findpokemon', (req, res) => {
  var input  = req.query.name;
  var link1=`https://pokeapi.co/api/v2/pokemon/${input}/`;
  var link2= `https://pokeapi.co/api/v2/pokemon-form/${input}/`;

  axios.get(link2).then((response) =>{
    pokeimage = response.data.sprites.front_default;

  })
  .catch((error)=>{
  });

  axios.get(link1).then((response) =>{

    pokename = response.data.forms[0].name;
    ability1 = response.data.abilities[0].ability.name;
    ability2 = response.data.abilities[1].ability.name;
    pokeindex = JSON.stringify(response.data.game_indices[0].game_index);

    pokedata = new mongo({
      name: pokename,
      ability1: ability1,
      ability2: ability2,
      pokeindex: pokeindex,
      pokeimage: pokeimage
     });

      pokedata.
      save()
      .then(result => {
      })
      .catch(error=>{
      })
      })
      .catch((error)=>{

  })
  
  res.status(200).send(pokeindex);
});


app.get('/history', (req, res) => {
  mongo.find()
    .then(response => {
      console.log(response);
      res.status(200).send(response);
    })
    .catch(error => {
      console.log('Mongoose read error: ', error);
      res.status(400).send(error);
    });
});
app.get('/deleteall', (req, res) => {
  mongo.deleteMany({})
  .then((response)=>{
    res.status(200).send(response);
  })
  .catch((error)=>{
    res.status(400).send(error);
  })
});


app.listen(port,() => {
  console.log(`Server started on port ${port}`);
});