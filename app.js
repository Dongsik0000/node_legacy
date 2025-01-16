const express = require('express')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const mysql = require('mysql2')
require('dotenv').config();
const app = express()
const port = 3000

app.set('view engine', 'ejs')
app.set('views', './views')
// static file erving
app.use(express.static(__dirname+'/public')) // 정적 파일이 위치한 Directory
// parsing application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}))
// parsing JSON
app.use(bodyParser.json())

// MySQL Connection Pool :
// MySQL 커넥션을 사용할 때는, 주로 커넥션 풀을 이용하여 관리하는 것이 권장된다.
const connectionPool = mysql.createPool({  
  host: process.env.DB_HOST,  
  user: process.env.DB_USER,  
  password: process.env.DB_PW,  
  port: process.env.DB_PORT,  
  database: process.env.DB_NAME,  
  connectionLimit: 10,  
  insecureAuth: true,  
});  

// MySQL connection check
connectionPool.getConnection((err, connection) => {  
  if (err) {  
    console.error('MySQL 연결 중 에러 발생: ', err);  
  } else {  
    console.log('MySQL에 연결되었습니다.');  
    connection.release(); // 커넥션 반환  
  }  
});  

app.get('/', (req, res) => {
  res.render('index')
})



app.post('/api/contact', (req, res) => {  
  const name = req.body.name;  
  const phone = req.body.phone;  
  const email = req.body.email;  
  const memo = req.body.memo;  

  // Ensure values are correctly formatted  
  const SQL_Query = `INSERT INTO contact(name, phone, email, memo, create_at, modify_at)  
   VALUES ('${name}', '${phone}', '${email}', '${memo}', NOW(), NOW())`;  
   
  connectionPool.query(SQL_Query, (err, result) => {  
    if (err) {  
      console.error('데이터 삽입 중 에러 발생: ', err);  
      res.status(500).send('내부 서버 오류');  
    } else {  
      console.log('데이터가 삽입 되었습니다.');  
      res.send("<script>alert('문의사항이 등록되었습니다.'); location.href='/' </script>" );  
    }  
  });  
});  

app.get('/contactList', (req, res) => {
  const selectQuery = `SELECT * FROM contact ORDER BY ID DESC;`

  connectionPool.query(selectQuery, (err, result) => {  
    if (err) {  
      console.error('데이터 삽입 중 에러 발생: ', err);  
      res.status(500).send('내부 서버 오류');  
    } else {  
      console.log('데이터가 조회 되었습니다.');
      console.log(result);
      res.render('contactList', {lists:result});
    }  
  });
});

app.post('/api/contactDelete/:id', (req, res) => {
  const id = req.params.id;
  const deleteQuery = `DELETE FROM contact WHERE id ='${id}'`;
  connectionPool.query(deleteQuery, (err,result) =>{
    if (err) {
      console.error('데이터 삭제 중 에러 발생', err);
      res.status(500).send('내부 서버 오류');
    } else {
      console.log('데이터가 삭제되었습니다.')
      res.send("<script>alert('문의사항이 삭제되었습니다.'); location.href='/contactList'</script>")
    }
  });
});

app.post('/api/contactUpdate/:id', (req, res) => {  
  const id = req.params.id;  
  const status = "done";  
  const updateQuery = `UPDATE contact SET status = '${status}' WHERE id = '${id}'`;   

  connectionPool.query(updateQuery, [status, id], (err, result) => {  
      if (err) {  
          console.error('데이터 업데이트 중 에러 발생:', err);  
          res.status(500).send('내부 서버 오류');  
      } else {  
          console.log('데이터가 업데이트되었습니다.');  
          res.send("<script>alert('문의사항이 업데이트되었습니다.'); location.href='/contactList'</script>");  
      }  
  });  
});  

app.listen(port, () => {
  console.log(`Node Legacy App listening on port ${port}`)
})