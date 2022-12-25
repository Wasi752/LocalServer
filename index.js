const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")
const { parse } = require('path')
const bodyParser = require('body-parser');
const cors = require("cors");
const { json } = require('express')
const { stringify } = require('querystring')
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
        const allData = JSON.parse(data);
        const reqData = req.body;
        if (reqData.name.length < 5) {
            res.status(400).send(JSON.stringify({
                error: "Name must be contain atleast 5 Characters"
            }));
            return;
        }
        const rawImageString = reqData.image.replace(/^data:image\/jpeg;base64,/, "");
        const buffer = Buffer.from(rawImageString, "base64");
        reqData.id = allData.employees.length + 1;
        fs.writeFile(`public/staff/${reqData.id}.jpeg`, buffer, () => { });
        reqData.image = `${reqData.id}.jpeg`;
        allData.employees.push(reqData);
        fs.writeFile("employeeDatabase", JSON.stringify(allData), () => { });
        res.send(JSON.stringify(reqData));
    });
});
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
app.get('/fazilatResult', (req, res) => {
    fs.readFile("madrasaResult", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        res.send(JSON.stringify(allData.fazilatResult))
    })
})
app.post('/fazilatResults', (req, res) => {
    fs.readFile("madrasaResult", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const resultData = req.body;
        resultData.id = allData.fazilatResult.length + 1;
        allData.fazilatResult.push(resultData)
        fs.writeFile('madrasaResult', JSON.stringify(allData), () => { })
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
app.put('/results/:id', (req, res) => {
    fs.readFile("madrasaResult", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const resultInfoByID = allData.results.find(x => x.id == req.params.id);
        resultInfoByID.mname = req.body.mname;
        resultInfoByID.mcode = req.body.mcode;
        fs.writeFile("madrasaResult", JSON.stringify(allData), () => { })
        res.send(JSON.stringify(resultInfoByID))
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
        const getError = () => {
            const uppercaseRegExp = /(?=.*?[A-Z])/;
            const lowercaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp = /.{8,}/;
            const uppercasePassword = uppercaseRegExp.test(req.body.password);
            const lowercasePassword = lowercaseRegExp.test(req.body.password);
            const digitsPassword = digitsRegExp.test(req.body.password);
            const specialCharPassword = specialCharRegExp.test(req.body.password);
            const minLengthPassword = minLengthRegExp.test(req.body.password);
            const validEmailAddress = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const validEmail = validEmailAddress.test(req.body.email);
            if (req.body.username.length < 5) {
                return `Name must be contain atleast 5 Characters`;
            } else if (req.body.password.length === 0) {
                return "Password is empty";
            } else if (!uppercasePassword) {
                return "At least one Uppercase";
            } else if (!lowercasePassword) {
                return "At least one Lowercase";
            } else if (!digitsPassword) {
                return "At least one digit";
            } else if (!specialCharPassword) {
                return "At least one Special Characters";
            } else if (!minLengthPassword) {
                return "At least minumum 8 characters";
            } else if (req.body.confirmPassword !== req.body.password){
                return "Confirm password is not matched";
            } else if (req.body.email.length < 10) {
                return "E-mail is not valid";
            }  else if (!validEmail) {
                return "Email Addre must be in valid formate with @ symbol";
            }
            return "";
        }
        const error = getError();
        if (error !== "") {
            return res.status(400).send(JSON.stringify({
                error: error
            }))
        }
        userData.id = allData.users.length + 1;
        allData.users.push(userData);
        fs.writeFile("database", JSON.stringify(allData), () => { });
        res.send(JSON.stringify(userData));
    });
});
app.get('/registeredStudents', (req, res) => {
    fs.readFile("registration", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        res.send(JSON.stringify(allData.students))
    })
})
app.post("/studentRegistration", (req, res) => {
    fs.readFile("registration", "utf8", (err, data) => {
        const allData = JSON.parse(data)
        const reqData = req.body;
        const getError = () => {
            const uppercaseRegExp = /(?=.*?[A-Z])/;
            const lowercaseRegExp = /(?=.*?[a-z])/;
            const digitsRegExp = /(?=.*?[0-9])/;
            const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
            const minLengthRegExp = /.{8,}/;
            const uppercasePassword = uppercaseRegExp.test(req.body.password);
            const lowercasePassword = lowercaseRegExp.test(req.body.password);
            const digitsPassword = digitsRegExp.test(req.body.password);
            const specialCharPassword = specialCharRegExp.test(req.body.password);
            const minLengthPassword = minLengthRegExp.test(req.body.password);
            const validEmailAddress = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            const validEmail = validEmailAddress.test(req.body.email);
            const validMobileNumber = /^[0-9]*$/;
            const validNumber = validMobileNumber.test(req.body.mobileNumber);
            if (req.body.name.length < 5) {
                return `Name must be contain atleast 5 Characters`;
            } else if (req.body.password.length === 0) {
                return "Password is empty";
            } else if (!uppercasePassword) {
                return "At least one Uppercase";
            } else if (!lowercasePassword) {
                return "At least one Lowercase";
            } else if (!digitsPassword) {
                return "At least one digit";
            } else if (!specialCharPassword) {
                return "At least one Special Characters";
            } else if (!minLengthPassword) {
                return "At least minumum 8 characters";
            } else if (req.body.confirmPassword !== req.body.password){
                return "Confirm password is not matched";
            } else if (req.body.email.length < 10) {
                return "E-mail is not valid";
            } else if (!validEmail) {
                return "Email Addre must be in valid formate with @ symbol";
            } else if (req.body.mobileNumber < 11) {
                return "Mobile number must be 11 digit with in valid formate";
            }else if (!validNumber) {
                return "Mobile Number not valid";
            }
            return "";
        }
        const error = getError();
        if (error !== "") {
            return res.status(400).send(JSON.stringify({
                error: error
            }))
        }
        const rawImageString = reqData.image.replace(/^data:image\/jpeg;base64,/, "");
        const buffer = Buffer.from(rawImageString, "base64");
        reqData.id = allData.students.length + 1;
        fs.writeFile(`public/student/${reqData.id}.jpeg`, buffer, () => { });
        reqData.image = `${reqData.id}.jpeg`;
        allData.students.push(reqData);
        fs.writeFile("registration", JSON.stringify(allData), () => { });
        res.send(JSON.stringify(reqData));
    });
});
app.put('/registeredStudents/:id', (req, res) => {
    fs.readFile("registration", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const studentInfoByID = allData.students.find(x => x.id == req.params.id);
        studentInfoByID.name = req.body.name;
        fs.writeFile("registration", JSON.stringify(allData), () => { })
        res.send(JSON.stringify(studentInfoByID))
    })
})
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})