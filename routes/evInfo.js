var express = require("express");
var router = express.Router();
var request = require("request");
var xml2js = require("xml2js");

//DB연결
var evinfo = require("../mongo").charge;
const db = require("./../mysql");

// 보안 주의
var url = "http://openapi.kepco.co.kr/service/EvInfoServiceV2/getEvSearchList";
var queryParams =
  "?" +
  encodeURIComponent("serviceKey") +
  "=SERVICEKEY"; //service key

// csId로 충전소 검색
router.get("/find", function (req, res, next) {
  let csId = req.query.csId;
  sql = { id: csId };
  evinfo.find(sql, function (err, result) {
    if (err) throw err;
    res.send(result);
  });
});

//전기차 충전소 상세 정보(*무조건 주소로 검색)
router.get("/detail", function (req, res, next) {
  // 다시 encode하기 위한 decode(디코딩값 넘어옴)
  let addr = decodeURIComponent(req.query.addr);
  queryParams_ = url + queryParams + "&" + encodeURIComponent("addr") + "=" + encodeURIComponent(addr);

  //초기화
  let jsonresponse = null;
  let jsonparsed = null;
  let item = null;

  request(queryParams_, (err, response, body) => {
    if (err) throw err;
    var parser = new xml2js.Parser();
    parser.parseString(body, function (err, result) {
      jsonresponse = JSON.stringify(result);
      jsonparsed = JSON.parse(jsonresponse);
      item = jsonparsed["response"]["body"][0]["items"][0]["item"];
      res.send(item);
      result = null;
      queryParams_ = null;
      item = null;
      body = null;
    });
  });
});

//츙전기 상태 정보
router.get("/status/:addr", function (req, res, next) {
  queryParams = queryParams + "&" + encodeURIComponent("addr") + "=" + encodeURIComponent(req.params.addr);
  request(url + queryParams, (err, response, body) => {
    if (err) throw err;
    var parser = new xml2js.Parser();
    parser.parseString(body, function (err, result) {
      let jsonresponse = JSON.stringify(result);
      let jsonparsed = JSON.parse(jsonresponse);
      let item = jsonparsed["response"]["body"][0]["items"][0]["item"];
      let count = Object.keys(item).length;
      var statusArray = new Array();
      for (var i = 0; i < count; i++) {
        var id = item[i]["cpId"];
        var status = item[i]["cpStat"];
        let tempData = new Object();
        tempData.cpId = id;
        tempData.cpStat = status;
        statusArray.push(tempData);
      }
      res.send(statusArray); //object
    });
  });
});

module.exports = router;
