const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")
const { parse } = require('path')

app.get('/', (req, res) => {
    res.send('Bismillahir Rahmanir Rahim')
})
app.get('/employees', (req, res) => {
    fs.readFile("database", 'utf8', (err, data) => {
        const allData = JSON.parse(data) 
        res.send(JSON.stringify(allData.employees))
    })
})
app.get('/create-employee/:name', (req, res) => {
    fs.readFile("database", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        allData.employees.push(req.params.name) 
        fs.writeFile('database', JSON.stringify(allData), () => { })
        res.send(`${req.params.name}`)
    })
})
app.get('/departments', (req, res) => {
    fs.readFile("database", 'utf8', (err, data) => {
        const allData = JSON.parse(data) 
        res.send(JSON.stringify(allData.departments))
    })
})
app.get('/create-department/:name', (req, res) => {
    fs.readFile("database", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        allData.departments.push(req.params.name) 
        fs.writeFile('database', JSON.stringify(allData), () => { })
        res.send(`${req.params.name}`)
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})