const express = require('express')
const router = express.Router()

const basePath = path.join(__dirname,'templates')

router.post('/save', (req,res) => {
    console.log(req.body)

    const name = req.body.name
    const age = req.body.age

    console.log(`${name} e ${age}`)

    res.sendFile(`${basePath}/userform.html`)
})

router.use(express.json())

router.get('/add', (req,res) => {
    res.sendFile(`${basePath}/userform.html`)
})

router.get('/:id', (req,res) => {
    const id = req.params.id;

    console.log(`Estamos buscando o usuario: ${id}`)


    res.sendFile(`${basePath}/users.html`)
})

module.exports = router