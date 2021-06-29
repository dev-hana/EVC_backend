var express = require("express");
var router = express.Router();

var charge = require("../mongo").charge; //mongodb 연동js

// 충전소 불러오기
router.get("/charge", function (req, res, next) {
  charge.find({}, { addr: 1, name: 1, lat: 1, longi: 1, id: 1 }).exec((err, docs) => {
    if (err) throw err;
    res.send(docs);
    // callback(result);
  });
});

// 지역 이름 검색
router.get("/search/:name", function (req, res, next) {
  charge
    .find({ name: { $regex: ".*" + req.params.name + ".*" } }, { addr: 1, name: 1, lat: 1, longi: 1 })
    .limit(5)
    .exec((err, docs) => {
      if (err) throw err;
      res.send(docs);
      // callback(result);
    });
});

// 시작시 근처 검색
router.get("/near/:addr", function (req, res, next) {
  charge
    .find({ addr: { $regex: ".*" + req.params.addr + ".*" } }, { addr: 1, name: 1, lat: 1, longi: 1 })
    .limit(5)
    .exec((err, docs) => {
      if (err) throw err;
      res.send(docs);
      // callback(result);
    });
});

// csId로 주소 검색
router.get("/csId", function (req, res, next) {
  let id = req.query.id;
  var sql = { id: id };
  try {
    charge.find(sql, { addr: 1, name: 1, _id: 0 }, function (err, result) {
      if (err) throw err;
      // console.log(result);
      try {
        res.send(result[0]);
      } catch {
        res.send("Fail");
      }
    });
  } catch {
    console.log("Fail");
    res.send("Fail");
  }
});

module.exports = router;
