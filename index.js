var express = require("express");
var hbs = require("express-handlebars");
var mongoose = require("./db/connection"); //this might come from db/connection
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

app.get("/", function(req, res){
  res.redirect("/shows");
});

app.get("/shows", function(req, res){
  Show.find({}).then(function(shows){
    res.render("shows-index", {
      shows: shows
    });
  });
});

app.get("/shows/:headliner", function(req, res){
  Show.findOne(req.params).then(function(show){
    res.render("shows-show", {
      show: show
    });
  });
});

app.post("/shows/:headliner", function(req, res){
  Show.findOneAndUpdate(req.params, req.body.show, {new: true}).then(function(show){
    res.redirect("/shows/" + show.headliner)
  })
})

app.listen(app.get("port"), function(){
  console.log("help, I'm alive");
});
