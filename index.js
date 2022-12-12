const express = require('express')
const app = express()
const port = 3001 
const fs = require("fs")
const { parse } = require('path')
const bodyParser = require('body-parser');
const cors = require("cors");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(cors({
    origin : 'http://localhost:3000',
    credentials: true, // <= Accept credentials (cookies) sent by the client
  }));

app.get('/', (req, res) => {
    res.send('Bismillahir Rahmanir Rahim')
})
app.get('/employees', (req, res) => {
    fs.readFile("employeeDatabase", 'utf8', (err, data) => {
        const allData = JSON.parse(data) 
        res.send(JSON.stringify(allData.employees))
    })
})
app.post('/create-employee', (req, res) => {
    fs.readFile("employeeDatabase", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const employeeData = req.body;
        employeeData.id = allData.employees.length + 1;
        allData.employees.push(employeeData) 
        fs.writeFile('employeeDatabase', JSON.stringify(allData), () => { })
        res.send(`${req.body.name}`)
    })
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
app.get('/madrasas', (req, res) => {
    fs.readFile("employeeDatabase", 'utf8', (err, data) => {
        const allData = JSON.parse(data) 
        res.send(JSON.stringify(allData.madrasas))
    })
})
app.post('/create-madrasa', (req, res) => {
    fs.readFile("employeeDatabase", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const madrasaData = req.body;
        madrasaData.id = allData.madrasas.length + 1;
        allData.madrasas.push(madrasaData) 
        fs.writeFile('employeeDatabase', JSON.stringify(allData), () => { })
        res.send(`${req.body.name}`)
    })
})
app.get('/students', (req, res) => {
    fs.readFile("employeeDatabase", 'utf8', (err, data) => {
        const allData = JSON.parse(data) 
        res.send(JSON.stringify(allData.students))
    })
})
app.post('/create-student', (req, res) => {
    fs.readFile("employeeDatabase", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const studentData = req.body;
        studentData.id = allData.students.length + 1;
        allData.students.push(studentData) 
        fs.writeFile('employeeDatabase', JSON.stringify(allData), () => { })
        res.send(`${req.body.name}`)
    })
})
app.put('/students/:id', (req, res) => {
    fs.readFile("employeeDatabase", 'utf8', (err, data) => {
        const allData = JSON.parse(data) 
        const studentInfoByID = allData.students.find(x => x.id == req.params.id);
        studentInfoByID.name_arabic = req.body.name_arabic;
        allData.students.push(studentInfoByID) 
        fs.writeFile("employeeDatabase", JSON.stringify(allData), () => { })
        res.send(JSON.stringify(studentInfoByID))
    }) 
})

app.get('/registared-students', (req, res) => {
    fs.readFile("registration", 'utf8', (err, data) => {
        const allData = JSON.parse(data) 
        res.send(JSON.stringify(allData.registared-students))
    })
})
app.post('/create-registration', (req, res) => {
    fs.readFile("registration", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const registrationData = req.body;
        registrationData.id = allData.registared-students.length + 1;
        allData.registared-students.push(registrationData) 
        fs.writeFile('registration', JSON.stringify(allData), () => { })
        res.send(`${req.body.name}`)
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})