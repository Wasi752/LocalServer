const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")
const { parse } = require('path')
const bodyParser = require('body-parser');
const cors = require("cors");
const { json } = require('express')
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(cors({
    origin: 'http://localhost:3000',
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
app.get('/boards', (req, res) => {
    fs.readFile("employeeDatabase", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        res.send(JSON.stringify(allData.boards))
    })
})
app.post('/create-board', (req, res) => {
    fs.readFile("employeeDatabase", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const boardData = req.body;
        boardData.id = allData.boards.length + 1;
        allData.boards.push(boardData)
        fs.writeFile('employeeDatabase', JSON.stringify(allData), () => { })
        res.send(`${req.body.name}`)
    })
})
app.get('/results', (req, res) => {
    fs.readFile("madrasaResult", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        res.send(JSON.stringify(allData.results))
    })
})
app.post('/result', (req, res) => {
    fs.readFile("madrasaResult", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const resultData = req.body;
        resultData.id = allData.results.length + 1;
        allData.results.push(resultData)
        fs.writeFile('madrasaResult', JSON.stringify(allData), () => { })
        res.send(`${req.body.name}`)
    })
})
app.get('/madrasas', (req, res) => {
    fs.readFile("registration", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        res.send(JSON.stringify(allData.madrasas))
    })
})
app.post('/madrasa', (req, res) => {
    fs.readFile("registration", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const madrasaData = req.body;
        madrasaData.id = allData.madrasas.length + 1;
        allData.madrasas.push(madrasaData)
        fs.writeFile('ragistration', JSON.stringify(allData), () => { })
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
        fs.writeFile("employeeDatabase", JSON.stringify(allData), () => { })
        res.send(JSON.stringify(studentInfoByID))
    })
})

app.get('/registared-students', (req, res) => {
    fs.readFile("registration", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        res.send(JSON.stringify(allData.registared - students))
    })
})
app.post('/create-registration', (req, res) => {
    fs.readFile("registration", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const registrationData = req.body;
        registrationData.id = allData.registared - students.length + 1;
        allData.registared - students.push(registrationData)
        fs.writeFile('registration', JSON.stringify(allData), () => { })
        res.send(`${req.body.name}`)
    })
})
app.post("/signin", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const userData = req.body;
        const fusers = allData.users
            .filter(user => user.username === userData.username && user.password === userData.password)
        if (fusers.length > 0) {
            res.send(JSON.stringify(fusers[0]));
        }
        else {
            res.status(400).send()
        }
    });
});
app.post("/signup", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const userData = req.body;
        userData.id = allData.users.length + 1;
        allData.users.push(userData);
        fs.writeFile("database", JSON.stringify(allData), () => { });
        res.send(JSON.stringify(userData));
    });
});
app.post("/imageUpload", (req, res) => {
    fs.readFile("database", "utf8", (err, data) => {
        const allData = JSON.parse(data);
        const reqData = req.body;
        const rawImageString = reqData.image.replace(/^data:image\/jpeg;base64,/, "");
        const buffer = Buffer.from(rawImageString, "base64");
        reqData.id = allData.images.length + 1;
        fs.writeFile(`public/${reqData.id}.jpeg`, buffer, () => { });
        reqData.image = `${reqData.id}.jpeg`;
        allData.images.push(reqData);
        fs.writeFile("database", JSON.stringify(allData), () => { });
        res.send(JSON.stringify(reqData));
    });
});
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})