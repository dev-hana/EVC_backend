var express = require("express");
var router = express.Router();
var bookmark = require("../mongo").bookmark; // mongoDB, bookmark

// 현재 시간 저장을 위한 함수
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

// 북마크 추가
router.post("/book", function (req, res, next) {
  let mem_id = req.body.mem_id;
  let csId = req.body.csId;
  var date = getCurrentDate();
  // console.log(mem_id);
  // console.log(csId);
  var existql = { mem_id: mem_id, csId: csId };
  // console.log(existql);
  bookmark.find(existql, function (err, result) {
    if (err) throw err;
    console.log(result[0]);
    if (result[0] != null) {
      res.send("already exist");
    } else {
      var newBookmark = new bookmark({
        mem_id: mem_id,
        date: date,
        csId: csId,
      });
      newBookmark.save(function (error, data) {
        if (error) {
          console.log(error);
        } else {
          res.send(true);
        }
      });
    }
  });
});

//북마크 삭제
router.delete("/unbook", function (req, res, next) {
  let mem_id = req.query.mem_id;
  let csId = req.query.csId;
  var sql = { mem_id: mem_id, csId: csId };
  bookmark.deleteOne(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.send(result);
  });
});

//회원별 북마크한 정보

router.get("/search", function (req, res, next) {
  let mem_id = req.query.mem_id;
  var sql = { mem_id: mem_id };
  bookmark.find(sql, function (err, result) {
    if (err) throw err;
    // console.log(result);
    res.send(result);
  });
});

module.exports = router;
