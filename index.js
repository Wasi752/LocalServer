const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")
const { parse } = require('path')
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())

app.get('/', (req, res) => {
    res.send('Bismillahir Rahmanir Rahim')
})
app.get('/results', (req, res) => {
    fs.readFile("database", 'utf8', (err, data) => {
        const allData = JSON.parse(data) 
        res.send(JSON.stringify(allData.results))
    })
})
app.post('/create-result', (req, res) => {
    fs.readFile("database", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const resultData = req.body;
        resultData.id = allData.results.length + 1;
        allData.results.push(resultData) 
        fs.writeFile('database', JSON.stringify(allData), () => { })
        res.send(`${req.body.name}`)
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})