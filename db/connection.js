var mongoose = require("mongoose");

var ShowSchema = new mongoose.Schema(
  {
    headliner: String,
    supporting_act: String,
    date: String,
    time: String,
    price: String
  }
);

mongoose.model("Show", ShowSchema);

// Need to add conditional when pushing live; db to be hosted at mLabs

// mongoose.connect("mongodb://localhost/930");

if(process.env.NODE_ENV == "production"){
  mongoose.connect(process.env.MONGODB_URI);
}else{
  mongoose.connect("mongodb://localhost/930");
}

module.exports = mongoose;
