// Dependencies
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
const logger = require("morgan");
const axios =require ("axios")
const PORT = process.env.PORT || 3001;
const app = express();
const apiRoutes = require("./routes/apiRoutes.js");
const mongojs = require("mongojs");

// Set the app up with morgan
app.use(logger("dev"));

// set the app up with bodyparser
app.use(bodyParser());

// Database configuration
const databaseUrl = process.env.MONGODB_URI || "nytreact_db";
const collections = ["news"];

// Hook mongojs config to db variable
const db = mongojs(databaseUrl , collections);

// Log any mongojs errors to console
db.on("error", function(error) {
  console.log("Database Error:", error);
});

/*
  if we don't do this here then we'll get this error in apps that use this api

  Fetch API cannot load No 'Access-Control-Allow-Origin' header is present on the requested resource. Origin is therefore not allowed access. If an opaque response serves your needs, set the request's mode to 'no-cors' to fetch the resource with CORS disabled.

  read up on CORs here: https://www.maxcdn.com/one/visual-glossary/cors/
*/
  //allow the api to be accessed by other apps
  app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE");
    next();
  });

//route to get all of my books
app.get('/news', function(req, res){
	db.news.find({}, function(error, result){
	    res.json(result);
	});
});


//route to save a story
app.post('/newsInsert', function(req, res){
	db.news.insert(req.body, function(error, savedStory) {
	  // Log any errors
	  if (error) {
	    res.send(error);
	  }else {
	    res.json(savedBook);
	  }
	});
});

//route to delete a saved story
app.delete('/delete/:id', function(req, res){
  var book_id = req.params.id;

  db.news.remove({
    "_id": mongojs.ObjectID(book_id)
  }, function(error, removed) {
    if (error) {
      res.send(error);
    }else {
      res.json(book_id);
    }
  });

});

// // Listen on port 3001
  app.listen(PORT, function() {
    console.log('🌎 ==> Now listening on PORT %s! Visit http://localhost:%s in your browser!', PORT, PORT);
  });




  // app.get("/news", (req, res) => {
  //   axios
  //     .get("https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=" +
  //     b9f91d369ff59547cd47b931d8cbc56b:0:74623931+ "&q=", { params: req.query })
  //     .then(({ data: { results } }) => res.json(results))
  //     .catch(err => res.status(422).json(err));
  // });
  
  // module.exports = router;