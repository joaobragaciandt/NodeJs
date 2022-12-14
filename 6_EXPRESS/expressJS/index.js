const express = require('express')
const app = express()
const port = 3000

const path = require('path')

const users = require('./users')



// const checkAuth = function(req,res, next) {
//     req.authStatus = true

//     if(req.authStatus) {
//         console.log('Está logado, pode continuar')
//         next()
//     } else {
//         console.log('Não está logado, faça o login para continuar')
//     }
// }

// app.use(checkAuth)

app.use(
    express.urlencoded({
        extended: true,
    }),
)

//app.use(express.static('public'))

app.use(express.json())

const basePath = path.join(__dirname,'templates')

app.use('/users', users)

app.use(function(req, res, next) {
    res.status(404).sendFile(`${basePath}/404.html`)
})

app.get('/', (req,res) => {
    res.sendFile(`${basePath}/index.html`)
})

app.listen(port, () => {
    console.log('App rodando na porta 3000')
})

