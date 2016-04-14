var express = require("express");
var hbs = require("express-handlebars");
// var mongoose = require("mongoose"); this might come from db/connection
var app = express();


app.set("port", process.env.PORT || 3001);
app.listen(app.get("port"), function(){
  console.log("help, I'm alive")
})

app.get("/", function(req, res){
  res.send("WORKING")
})
