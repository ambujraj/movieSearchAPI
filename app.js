const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");

app.get("/", function(req, res){
  res.render("search");
});
app.get("/results", function(req, res){
    var query = req.query.query;
    var url = 'https://www.omdbapi.com/?s='+query+'&apikey=thewdb';
    request(url, function (error, response, body) {
        if (!error && response.statusCode == 200) {
            var parsed = JSON.parse(body);
            res.render("result", {name: parsed});
                  
        }
    });
   
});

app.listen(process.env.PORT||3000, function(){
    console.log("Server started at port 3000");
});