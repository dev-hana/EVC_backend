var express = require("express");
var router = express.Router();
var { smtpTransport } = require("../email");

// 비밀번호 암호화
var bkfd2Password = require("pbkdf2-password");
var hasher = bkfd2Password();

const db = require("./../mysql"); //mysql 연동js
const { ResultWithContext } = require("express-validator/src/chain");

// 랜덤숫자 생성 함수
var generateRandom = function (min, max) {
  var random = Math.floor(Math.random() * (max - min + 1)) + min;
  return random;
};

// 이메일 인증
router.post("/send/email", function (req, res, next) {
  const sendEmail = req.body.sndEmail;
  var number = generateRandom(111111, 999999);
  SendEmail = async (req, res) => {
    let mailOptions = smtpTransport.sendMail({
      from: "EMAILADDR",
      to: sendEmail,
      subject: "electronic vehicle Service 인증번호입니다",
      html: "인증번호 : " + number,
    });
    // console.log(sendEmail);
    const result = await smtpTransport.sendMail(mailOptions, (error, responses) => {
      if (error) {
        return res.status(statusCode.OK).send(util.fail(statusCode.BAD_REQUEST, responseMsg.AUTH_EMAIL_FAIL));
      } else {
        return res.status(statusCode.OK).send(
          util.success(statusCode.OK, responseMsg.AUTH_EMAIL_SUCCESS, {
            number: number,
          })
        );
      }
      smtpTransport.close();
    });
  };
  SendEmail();
  // console.log(number);
  var numString = String(number);
  res.send(numString);
});

// 회원가입
router.post("/new", function (req, res, next) {
  let param = JSON.parse(JSON.stringify(req.body));

  // 비밀번호 암호화
  hasher({ password: param["password"] }, function (err, pass, salt, hash) {
    try {
      db.insertMember(param["id"], hash, param["name"], param["phone"], param["email"], salt, (error, result) => {
        //salt 저장 필수
        if (result == null) {
          res.send("Fail");
          console.log("Faile to insert member");
        } else {
          res.send(result);
          // console.log(result);
        }

      });
    } catch {
      console.log("none");
      res.send("none")
      //console.log(error)
    }
  });
});

// 아이디 중복 체크
router.get("/exist/id", function (req, res, next) {
  let id = req.query.id;
  db.getMember(id, (result) => {
    let flag = true; //true: 가입가능  false: 가입불가(중복)
    if (result.length != 0) {
      flag = false;
    }
    res.send(flag);
  });
});

// 이메일 중복 체크
router.get("/exist/email", function (req, res, next) {
  let email = req.query.email;
  db.getEmail(email, (result) => {
    let flag = true; //true: 가입가능  false: 가입불가(중복)
    if (result.length != 0) {
      flag = false;
    }
    res.send(flag);
  });
});

//로그인
router.post("/signin", async function (req, res, next) {
  let param = JSON.parse(JSON.stringify(req.body));
  // console.log("id: " + param["id"]);
  // console.log("password: " + param["password"]);
  try {
    db.getMember(param["id"], (result, error) => {
      if (result == null) {
        console.log("아이디 없음");
        res.send("아이디가 존재하지 않습니다.");
      } else if (result.length == 0) {
        console.log("아이디 없음");
        res.send("아이디가 존재하지 않습니다.");
      } else {
        memlist = result[0];
        if (memlist["withdrawal"] == null) {
          const mempwd = memlist["password"];
          const memsalt = memlist["salt"];
          hasher({ password: param["password"], salt: memsalt }, (err2, pw2, salt2, hash2) => {
            if (err2) throw err2;
            if (mempwd == hash2) res.send(true);
            else res.send(false);
          });
        } else {
          res.send("탈퇴");
        }
      }
    });
  } catch {
    console.log("fail");
    res.send("fail");
  }

});

// 아이디 찾기
router.get("/find/id", async function (req, res, next) {
  let email = req.query.email;
  // console.log(email);
  try {
    db.getId(email, (result, error) => {
      // console.log("result: "+result);
      if (result == null) {
        console.log(err);
        res.send("no eamil in member list");
      }else if(result.length==0){
        console.log("no eamil in member list");
        res.send("no eamil in member list");
      } else {
        res.send(result[0]["id"]);
      }
    });
  } catch {
    console.log("no email");
    res.send("fail");
  }
});


// 비밀번호 재설정
router.post("/repassword", async function(req, res, next){
  let param = JSON.parse(JSON.stringify(req.body));
  try {
    db.getMember(param["id"], (result, error) => {
      if (result == null) {
        console.log("아이디 없음");
        res.send("아이디가 존재하지 않습니다.");
      } else if (result.length == 0) {
        console.log("아이디 없음");
        res.send("아이디가 존재하지 않습니다.");
      } else {
        memlist = result[0];
        if (memlist["withdrawal"] == null) {
          hasher({ password: param["password"] }, function (err, pass, salt, hash) {
            try {
              db.updatePassword(param["id"], hash, salt, (error, result) => {
                //salt 저장 필수
                res.send("true");
                console.log("true");
              });
            } catch {
              console.log("none");
              res.send("none");
              //console.log(error)
            }
          });
        } else {
          res.send("탈퇴");
        }
      }
    });
  } catch {
    console.log("fail");
    res.send("fail");
  }
})

module.exports = router;
