const express = require('express')
const ejs = require('ejs')
const app = express()
const port = 3000


app.set('view engine', 'ejs')
app.set('views', './views')
// static file erving
app.use(express.static(__dirname+'/public')) // 정적 파일이 위치한 Directory

app.get('/', (req, res) => {
  res.render('index')
})

app.get('/blog', (req, res) => {
  res.render('blog')
})

app.get('/users', (req, res) => {
  res.render('users')
})

app.post('/api/contact', (req, res) => {
  const name = req.body.name;
  const phone = req.body.phone;
  const email = req.body.email;
  const memo = req.body.memo;

  const data = `${name} ${phone} ${email} ${memo}`

  res.send(data)
})



app.listen(port, () => {
  console.log(`Node Legacy App listening on port ${port}`)
})