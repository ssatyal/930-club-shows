var mongoose = require("./connection");
var seedData = require("./seed_data");

var Show = mongoose.model("Show");

Show.remove({}).then(function(){
  Show.collection.insert(seedData).then(function(){
    process.exit();
  });
});
