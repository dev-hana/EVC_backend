// 몽고디비 연결 보안주의
const mongoose = require("mongoose");
mongoose.connect("mongodb://IP/DATABASE", { useNewUrlParser: true, useUnifiedTopology: true });

const mongo = mongoose.connection;

mongo.on("error", function () {
  console.log("Connection Failed!");
});

mongo.once("open", function () {
  console.log("Connected!");
});

// 충전소
const charge = mongoose.Schema({
  addr: String,
  id: String,
  name: String,
  lat: String,
  longi: String,
  count: Number,
});

//리뷰
const review = mongoose.Schema({
  mem_id: String,
  date: Date,
  star: Number,
  csId: Number,
  content: String,
});


//북마크
const bookmark = mongoose.Schema({
  mem_id: String,
  csId: String,
  date: Date,
});

// 모델 모듈화
module.exports.charge = mongoose.model("ev_info", charge, "ev_info");
module.exports.review = mongoose.model("review", review, "review");
module.exports.bookmark = mongoose.model("bookmark", bookmark, "bookmark");
