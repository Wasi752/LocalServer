const fs = require("fs")
const { body, check, validationResult } = require('express-validator');

const routes = (app) => {
    const { modify, POST, PUT, DELETE, GET, GETID, writeFile } = require('./utility')(app)
    //const utility = require('./utility');
    //const { modify, GET, GETID, POST, PUT, DELETE, writeFile } = utility(app)
    
    app.get('/', (req, res) => {
        res.send('Bismillahir Rahmanir Rahim')
    })

    //---------------
    GET('/employees', 'employeeDatabase.json', 'employees');
    GETID('/employees/:id', 'employeeDatabase.json', 'employees');
    POST('/employees', 'employeeDatabase.json', 'employees')
    PUT('/employees/:id', 'employeeDatabase.json', 'employees', [
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
        'nid'
    ])
    DELETE('/employees/:id', 'employeeDatabase.json', 'employees');

    // ---------------------
    GET('/boards', 'employeeDatabase.json', 'boards');
    GETID('/boards/:id', 'employeeDatabase.json', 'boards');
    POST('/boards', 'employeeDatabase.json', 'boards')
    PUT('/boards/:id', 'employeeDatabase.json', 'boards', ['name_arabic', 'name_bangala', 'name_english', 'address']);
    DELETE('/boards/:id', 'employeeDatabase.json', 'boards')
    //--------------
    GET('/fazilatResult', 'madrasaResult.json', 'fazilatResult');
    GETID('/fazilatResults/:id', 'madrasaResult.json', 'fazilatResult');
    POST('/fazilatResults', 'madrasaResult.json', 'fazilatResult');
    PUT('/fazilatResults/:id', 'madrasaResult.json', 'fazilatResult', ['madrasa', 'name', 'fname']);
    DELETE('/fazilatResults/:id', 'madrasaResult.json', 'fazilatResult');
    // -----------------
    GET('/result', 'madrasaResult.json', 'results');
    GETID('/result/:id', 'madrasaResult.json', 'results');
    POST('/result', 'madrasaResult.json', 'results');
    PUT('/result/:id', 'madrasaResult.json', 'results', ['mname', 'name']);
    DELETE('/result/:id', 'madrasaResult.json', 'results');
    //------------------
    GET('/madrasa', 'registration.json', 'madrasas');
    GETID('/madrasa/:id', 'registration.json', 'madrasas');
    POST('/madrasa', 'registration.json', 'madrasas');
    PUT('/madrasa/:id', 'registration.json', 'madrasas', ['name_arabic', 'name_bangala', 'name_english', 'muhtamim']);
    DELETE('/madrasa/:id', 'registration.json', 'madrasas');
    //-----------------
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
    //----------------
    GET('/registeredStudents', 'registration', 'students');
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
    PUT('/registeredStudents/:id', 'registration', 'students', []);
    DELETE('/registeredStudents/:id', 'registration', 'students');
    //----------------
    GET('/users', 'madrasa', 'users');
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
}
module.exports = routes;