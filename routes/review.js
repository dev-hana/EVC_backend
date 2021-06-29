var express = require("express");
var router = express.Router();
const db = require("./../mysql"); //mysql 연동js

// 현재 시간을 가져오기 위한 함수
function getCurrentDate() {
  var date = new Date();
  var year = date.getFullYear();
  var month = date.getMonth();
  var today = date.getDate();
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var seconds = date.getSeconds();
  var milliseconds = date.getMilliseconds();
  return new Date(Date.UTC(year, month, today, hours, minutes, seconds, milliseconds));
}

// 리뷰 작성
router.post("/new", function (req, res, next) {
  let param = JSON.parse(JSON.stringify(req.body));

  try {
    db.insertReview(param["mem_id"], param["csId"], param["star"], param["content"], (error, result) => {
      if (result == null) {
        res.send("Fail");
        console.log("Faile to insert review");
      } else {
        res.send(result);
      }
    });
  } catch {
    console.log("Fail");
    res.send("리뷰 중복");
  }
});

//리뷰 삭제
router.delete("/nomore", function (req, res, next) {
  let mem_id = req.query.mem_id;
  let csId = req.query.csId;
  try {
    db.deleteReview(mem_id, csId, (error, result) => {
      if (result.affectedRows == 0) {
        res.send("null");
      } else {
        res.send(result);
      }
    });
  } catch {
    console.log("error");
    res.send("error");
  }
});

//리뷰 수정(생성X)
router.patch("/mod", function (req, res, next) {
  let param = JSON.parse(JSON.stringify(req.body));

  try {
    db.updateReview(param["mem_id"], param["csId"], param["star"], param["content"], (error, result) => {
      if (result.affectedRows == 0) {
        res.send("none");
      } else {
        res.send(result);
      }
    });
  } catch {
    console.log("error");
    res.send("error");
  }
});

//특정 충전소 리뷰 보기
router.get("/", function (req, res, next) {
  let mem_id = req.query.mem_id;
  let csId = req.query.csId;
  var sql = "";
  csId_ = parseInt(csId);

  if (!mem_id && csId_) {
    // csId로 검색
    sql = `SELECT * FROM review WHERE csId= ${csId_}`;
  } else if (!csId_ && mem_id) {
    // mem_id로 검색
    sql = `SELECT * FROM review WHERE mem_id= '${mem_id}'`;
  } else if (!csId_ && !mem_id) {
    res.send("No Query Param");
  } else {
    // 둘다 검색
    sql = `SELECT * FROM review WHERE mem_id= '${mem_id}' and csId='${csId_}'`;
  }

  try {
    db.getReview(sql, (error, result) => {
      if (result[0] == null) {
        res.send("none");
      } else {
        res.send(result);
      }
    });
  } catch {
    res.send("Fail");
  }
});

module.exports = router;
