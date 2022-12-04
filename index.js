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
app.get('/employees', (req, res) => {
    fs.readFile("database", 'utf8', (err, data) => {
        const allData = JSON.parse(data) 
        res.send(JSON.stringify(allData.employees))
    })
})
app.post('/create-employee', (req, res) => {
    fs.readFile("database", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const employeeData = req.body;
        employeeData.id = allData.employees.length + 1;
        allData.employees.push(employeeData) 
        fs.writeFile('database', JSON.stringify(allData), () => { })
        res.send(`${req.body.name}`)
    })
})
app.get('/departments', (req, res) => {
    fs.readFile("database", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        res.send(JSON.stringify(allData.departments))
    })
})
app.post('/create-department', (req, res) => {
    fs.readFile("database", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const departmentData = req.body;
        departmentData.id = allData.departments.length + 1; 
        allData.departments.push(departmentData) 
        fs.writeFile('database', JSON.stringify(allData), () => { })
        res.send(`${req.body.name}`)
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})