const express = require('express')
const app = express()
const port = 3000
const fs = require("fs")

app.get('/', (req, res) => {
    res.send('Bismillahir Rahmanir Rahim')
})
app.get('/start', (req, res) => {
    fs.writeFile('Count', '0', () => { })
    res.send('You have writen')
})
app.get('/num', (req, res) => {
    fs.readFile("Count", 'utf8', (err, data) => {
        const x = parseInt(data) + 1
        const text = x.toString()
        fs.writeFile('Count', text, () => { })
        res.send("Count increased")
    })
})


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})