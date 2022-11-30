const express = require('express')
const app = express()
const port = 3000
const fs = require("fs")

app.get('/', (req, res) => {
    res.send('Bismillahir Rahmanir Rahim')
})
app.get('/start', (req, res) => {
    fs.appendFile('Count', '\n Nazmul is a good boy.', () => { })
    res.send('You have writen')
})
app.get('/num', (req, res) => {
    fs.readFile("Count", 'utf8', (err, data) => {
        res.send(data)
    })
})
app.get('/namaz', (req, res) => {
    fs.appendFile('Five', ' Tahazzud', () => { })
    res.send('Al Hamdulillah')
})
app.get('/salatname', (req, res) => {
    fs.readFile("Five", 'utf8', (err, data) => {
        res.send(data)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})