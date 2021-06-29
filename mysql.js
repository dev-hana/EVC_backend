const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "IP", //보안 주의
  user: "USER",
  password: "PASSWORD", //보안 주의
  port: PORT,
  database: "DATABASE",
});

//회원 추가
function insertMember(id, password, name, phone, email, salt, callback) {
  connection.query(
    `INSERT INTO member (id, password, name, phone, email, salt) VALUES ('${id}', '${password}', '${name}', '${phone}', '${email}', '${salt}')`,
    (err, result) => {
      //if (err) throw err;
      callback(result);
    }
  );
}

// 비밀번호 수정
function updatePassword(id, password, salt, callback) {
  connection.query(
    `UPDATE member SET password='${password}', salt='${salt}' WHERE id='${id}'`,
    (err, result) => {
      //if (err) throw err;
      callback(result);
    }
  );
}

// 회원검색(id)
function getMember(id, callback) {
  connection.query(
    `SELECT * FROM member WHERE id='${id}'`,
    (err, row) => {
      //if (err) throw err;
      callback(row);
    });
}

// 아이디 검색(email)
function getId(email, callback) {
  connection.query(
    `SELECT id FROM member WHERE withdrawal is null and email='${email}'`, 
    (err, row) => {
    // if (err) throw err;
    callback(row);
  });
}

//email 중복검색 위한 쿼리
function getEmail(email, callback) {
    connection.query("SELECT * FROM member WHERE email=?", email, (err, result) => {
      //if (err) throw err;
      callback(result);
    });
}

//리뷰 추가
function insertReview(mem_id, csId, star, content, callback) {
  connection.query(
    `INSERT INTO review (mem_id, csId, star, content) VALUES ('${mem_id}', '${csId}', '${star}', '${content}')`,
    (err, result) => {
      //if (err) throw err;
      // console.log("result", result)
      callback(err, result);
    }
  );
}

// 리뷰 삭제
function deleteReview(mem_id, csId, callback){
  connection.query(
    `DELETE FROM review WHERE mem_id = '${mem_id}' and csId= '${csId}'`,
    (err, result) => {
      console.log("result: ", result);
      callback(err, result);
    }
  )
}

// 리뷰 수정
function updateReview(mem_id, csId,  star, content, callback){
  connection.query(
    `UPDATE review SET star='${star}', content='${content}' WHERE mem_id = '${mem_id}' and csId= '${csId}'`,
    (err, result) => {
      console.log("result: ", result);
      callback(err, result);
    }
  )
}

// 리뷰 검색
function getReview(sql, callback){
  connection.query(
    sql, (err, result) =>{
      console.log("result", result);
      callback(err, result);
    }
  )
}

module.exports = {
  insertMember,
  getMember,
  getId,
  getEmail,
  updatePassword,
  insertReview,
  deleteReview,
  updateReview,
  getReview
};
