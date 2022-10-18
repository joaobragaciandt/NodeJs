const express = require('express')
const exphbs = require('express-handlebars')
const pool = require('./db/conn')

const app = express()

app.engine('handlebars', exphbs.engine())
app.set('view engine', 'handlebars')

app.use(
    express.urlencoded({
      extended: true,
    }),
  )

app.use(express.json())
app.use(express.static('public'))

app.get('/', function (req, res) {
    res.render('home')
  })

app.post('/books/insertbook', (req,res) => {
    const title = req.body.title
    const pageqty = req.body.pageqty

    const sql = `INSERT INTO books (title, pageqty) VALUES('${title}', '${pageqty}')`

    pool.query(sql, (err) => {
        if(err) {
            console.log(err)
        }

        res.redirect('/books')
    })

})

app.get('/books/edit/:id', function (req, res) {
    const id = req.params.id
  
    const query = `SELECT * FROM books WHERE id = ${id}`
  
    pool.query(query, function (err, data) {
      if (err) {
        console.log(err)
      }
  
      const book = data[0]
  
      res.render('editbook', { book })
    })
  })
  
app.post('/books/updatebook', function (req, res) {
    const id = req.body.id
    const title = req.body.title
    const pageqty = req.body.pageqty

    const query = `UPDATE books SET title = '${title}', pageqty = ${pageqty} WHERE id = ${id}`

    pool.query(query, function (err) {
        if (err) {
        console.log(err)
        }

        res.redirect(`/books`)
    })
})

app.post('/books/remove/:id', function (req, res) {
    const id = req.params.id

    const query = `DELETE FROM books WHERE id = ${id}`

    pool.query(query, function (err) {
        if (err) {
            console.log(err)
            return
        }

        res.redirect(`/books`)
    })
})

app.get('/books/:id', function (req, res) {

    const id = req.params.id

    const sql = `SELECT * FROM books WHERE id = ${id}`

    pool.query(sql, (err,data) => {
        if(err) {
            console.log(err)
        }

        const book = data[0];

        res.render('book', { book })

    })
  })

app.get('/books', function (req, res) {
    const sql = "SELECT * FROM books"

    pool.query(sql, (err,data) => {
        if(err) {
            console.log(err)
        }

        const books = data;

        console.log(books)

        res.render('books', { books })

    })
  })

app.listen(3000)