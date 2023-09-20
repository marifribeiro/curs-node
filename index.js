const express = require("express")
const exphbs = require("express-handlebars")
const mysql = require("mysql")

const app = express()

app.use(
  express.urlencoded({
    extended: true,
  }),
)

app.use(express.json())
app.use(express.static("public"))

app.engine('handlebars', exphbs.engine())
app.set("view engine", "handlebars")

app.get('/', (req, res) => {
  res.render('home')
})

app.post('/books/new', (req, res) => {
  const title = req.body.title
  const pageAmount = req.body.pageAmount

  const query = `INSERT INTO books (title, page_amount) VALUES ('${title}', '${pageAmount}')`

  conn.query(query, (err) => {
    if (err) {
      console.log(`Erro ao inserir novos dados no banco: ${err}`)
    }

    res.redirect('/')
  })
})

app.get('/books', (req, res) => {
  const query = "SELECT * FROM books"

  conn.query(query, (err, data) => {
    if (err) {
      console.log(`Erro ao listar entradas do banco: ${err}`)
    }

    const books = data
    res.render('books', {books})
  })
})

app.get('/book/:id', (req, res) => {
  const id = req.params.id

  const query = `SELECT * FROM books WHERE id = ${id}`

  conn.query(query, (err, data) => {
    if (err) {
      console.log(`Erro ao listar entradas do banco: ${err}`)
    }

    const book = data[0];
    res.render('book', {book})
  })
})

const conn = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "nodemysql"
})

conn.connect((err) => {
  if (err) {
    console.log(`Erro ao conectar ao banco de dados: ${err}`)
  }

  console.log("Sucesso ao conectar ao banco de dados")

  app.listen(3000)
})