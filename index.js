const express = require('express')
const app = express()
const port = 3001
const fs = require("fs")
const { parse } = require('path')
const bodyParser = require('body-parser');
const cors = require("cors");
const { json } = require('express')
const { stringify } = require('querystring')
const { body, check, validationResult } = require('express-validator');
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
const modify2 = (dbName, callBack, res) => fs.readFile(dbName, 'utf8', (err, data) => {
    const allData = JSON.parse(data)
    const result = callBack(allData)
    res.send(result)
});
app.get('/employees', (req, res) => {
    modify2("employeeDatabase.json", (allData) => {
        return allData.employees;
    }, res)
})
app.get('/employees/:id', (req, res) => {
    modify2("employeeDatabase.json", (allData) => {
        const employeeInfoByID = allData.employees.find(x => x.id == req.params.id);
        return employeeInfoByID;
    }, res)
})

app.put('/employees/:id', (req, res) => {
    modify2('employeeDatabase.json', (alldata) => {
        const employeeInfoByID = allData.employees.find(x => x.id == req.params.id);
        const modify = (prop) => employeeInfoByID[prop] = req.body[prop];
        const modificationList = [
        'name',
        'father',
        'mother',
        'present_address',
        'permanent_address',
        'academic_achievement',
        'languages_skills',
        'designation',
        'contact_no',
        'e_mail',
        'room_no',
        'image',
        'nationality',
        'brith',
        'nid',
        'id'
    ];
    modificationList.forEach(modify)
        writeFile("employeeDatabase.json", allData);
        return employeeInfoByID;
    }, res)
})
const writeFile = (dbName, data) => fs.writeFile(dbName, JSON.stringify(data), () => { })

app.delete('/employees/:id', (req, res) => {
    fs.readFile("employeeDatabase.json", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        allData.employees = allData.employees.filter(x => x.id != req.params.id);
        writeFile("employeeDatabase.json", allData)
        res.status(204).send()
    })
})
app.post('/employees', (req, res) => {
    fs.readFile("employeeDatabase.json", 'utf8', (err, data) => {
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
        writeFile("employeeDatabase.json", allData)
        res.send(JSON.stringify(reqData));
    });
});
app.get('/boards', (req, res) => {
    modify2("employeeDatabase.json", allData => {
        return allData.boards;
    }, res)
})
app.post('/create-board', (req, res) => {
    fs.readFile("employeeDatabase.json", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const boardData = req.body;
        boardData.id = allData.boards.length + 1;
        allData.boards.push(boardData)
        writeFile("employeeDatabase.json", allData)
        res.send(`${req.body.name}`)
    })
})
app.get('/fazilatResult', (req, res) => {
    modify2("madrasaResult", allData => {
        return allData.fazilatResult;
    }, res)
})
app.post('/fazilatResults', (req, res) => {
    fs.readFile("madrasaResult", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const resultData = req.body;
        resultData.id = allData.fazilatResult.length + 1;
        allData.fazilatResult.push(resultData)
        writeFile('madrasaResult', allData)
        res.send(`${req.body.name}`)
    })
})
app.get('/results', (req, res) => {
    modify2("madrasaResult", allData => {
        return allData.results;
    }, res)
})
app.post('/result', (req, res) => {
    fs.readFile("madrasaResult", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const resultData = req.body;
        resultData.id = allData.results.length + 1;
        allData.results.push(resultData)
        writeFile('madrasaResult', allData)
        res.send(`${req.body.name}`)
    })
})
app.put('/results/:id', (req, res) => {
    fs.readFile("madrasaResult", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const resultInfoByID = allData.results.find(x => x.id == req.params.id);
        resultInfoByID.mname = req.body.mname;
        resultInfoByID.mcode = req.body.mcode;
        writeFile('madrasaResult', allData)
        res.send(JSON.stringify(resultInfoByID))
    })
})
app.get('/madrasas', (req, res) => {
    modify2("registration", allData => {
        return allData.madrasas;
    }, res)
})
app.post('/madrasa', (req, res) => {
    fs.readFile("registration", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const madrasaData = req.body;
        madrasaData.id = allData.madrasas.length + 1;
        allData.madrasas.push(madrasaData)
        writeFile('registration', allData)
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
            } else if (req.body.confirmPassword !== req.body.password) {
                return "Confirm password is not matched";
            } else if (req.body.email.length < 10) {
                return "E-mail is not valid";
            } else if (!validEmail) {
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
    modify2("registration", allData => {
        return allData.students;
    }, res)
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
            } else if (req.body.confirmPassword !== req.body.password) {
                return "Confirm password is not matched";
            } else if (req.body.email.length < 10) {
                return "E-mail is not valid";
            } else if (!validEmail) {
                return "Email Addre must be in valid formate with @ symbol";
            } else if (req.body.mobileNumber < 11) {
                return "Mobile number must be 11 digit with in valid formate";
            } else if (!validNumber) {
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
        writeFile('registration', allData)
        res.send(JSON.stringify(reqData));
    });
});
app.put('/registeredStudents/:id', (req, res) => {
    fs.readFile("registration", 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const studentInfoByID = allData.students.find(x => x.id == req.params.id);
        studentInfoByID.name = req.body.name;
        writeFile('registration', allData)
        res.send(JSON.stringify(studentInfoByID))
    })
})
app.get('/users', (req, res) => {
    modify2("madrasa", allData => {
        return allData.users;
    }, res)
})
app.post('/users',
    check('email')
        .isEmail()
        .withMessage('must be a valid email address'),
    check('password')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long')
        .matches(/\d/)
        .withMessage('must contain a number'),
    check('confirmPassword')
        .custom((value, { req }) => value === req.body.password)
        .withMessage('must match password'),
    check('name')
        .isLength({ min: 5 })
        .withMessage('must be at least 5 chars long'),
    check('mobile')
        .isLength({ min: 11, max: 11 })
        .withMessage('must be exactly 11 digits long'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        fs.readFile("madrasa", 'utf8', (err, data) => {
            const allData = JSON.parse(data)
            const userData = req.body;
            userData.id = allData.users.length + 1;
            allData.users.push(userData)
            writeFile('madrasa', allData)
            res.send(`${req.body.name}`)
        })
    })
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})