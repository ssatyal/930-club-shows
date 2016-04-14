var express = require("express");
var hbs = require("express-handlebars");
var mongoose = require("./db/connection");
var parser = require("body-parser");
var app = express();
var Show = mongoose.model("Show");

//sets port for local and heroku environments
app.set("port", process.env.PORT || 3001);
app.set("view engine", "hbs");
app.engine(".hbs", hbs({
  extname:       ".hbs",
  partialsDir:   "views/",
  layoutsDir:    "views/",
  defaultLayout: "layout-main"
}));

app.use("/assets", express.static("public"));
app.use(parser.urlencoded({extended: true}));
app.use(parser.json({extended: true}));


app.get("/shows", function(req, res){
  Show.find({}).then(function(shows){
    res.render("shows-index", {
      shows: shows
    });
  });
});

app.get("/api/shows", function(req, res){
  Show.find({}).then(function(shows){
    res.json(shows);
  });
});

app.post("/shows", function(req, res){
  console.log(req.body);
  Show.create(req.body.show).then(function(show){
    res.redirect("/shows/" + show.headliner);
  });
});

app.get("/api/shows/:headliner", function(req, res){
  Show.findOne(req.params).then(function(show){
    res.json(show);
  });
});

app.post("/shows/:headliner", function(req, res){
  Show.findOneAndUpdate(req.params, req.body.show, {new: true}).then(function(show){
    res.redirect("/shows/" + show.headliner);
  });
});

app.put("/api/shows/:headliner", function(req, res){
  Show.findOneAndUpdate(req.params, req.body.show, {new: true}).then(function(show){
    res.json(show);
  });
});

app.delete("/api/shows/:headliner", function(req, res){
  Show.findOneAndRemove(req.params).then(function(){
    res.json({success: true});
  });
});

app.get("/*", function(req, res){
  res.render("shows");
});

app.listen(app.get("port"), function(){
  console.log("help, I'm alive");
});
