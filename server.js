const express = require('express')
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}));

//connection to database
mongoose.connect("mongodb+srv://jitRec:jitRec@jitrec.jmqtl.mongodb.net/jitRec?retryWrites=true&w=majority", {useNewUrlParser: true,}, (err)=>{
  if (!err) {console.log("MongoDB Connection Succeeded")}
  else {console.log("Error connection: " + err);}
});

//db schema
const pokemonSchema = {
  pokemonName: String,
  pokemonType: String
};

const Pokemon = mongoose.model("Pokemon", pokemonSchema);

//chained route for all Pokemons - get, post, delete

app.route("/pokemon").get(function(req, res){
  Pokemon.find(function(err, data){
    if(!err) {
      res.send(data);
    }
    else {
      res.send(err);
    }
  });
}).post(function(req, res){
  const newPokemon = new Pokemon({
    pokemonName: req.body.pokemonName,
    pokemonType: req.body.pokemonType
  });
  newPokemon.save(function(err){
    if(!err){
      res.send("Save succeeded!")
    }
    else{
      res.send(err);
    }
  });
}).delete(function(req, res){
  Pokemon.deleteMany(function(err){
    if(!err){
      res.send("Succesfully deleted all Pokemons")
    }
    else{
      res.send(err)
    }
  });
});

// specific Pokemons

app.route("/pokemon/:_id")
.get(function(req, res){
  Pokemon.findOne({_id: req.params._id}, function(err, data){
    if(!err){
      res.send(data);
    }
    else{
      res.send("Can't find anything matching");
    }
  });
}).put(function(req, res){
  Pokemon.update(
  {pokemonName: req.params.pokemonName},
  {pokemonName: req.body.pokemonName, pokemonType: req.body.pokemonType}, function(err){
    if(!err){
      res.send("Succesfully updated");
    }
    else{
      res.send("Failure updated");
    }
  }
);
});

app.listen(3000, function(){
  console.log("Server is working");
});
