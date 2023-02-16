const fs = require("fs")
const { body, check, validationResult } = require('express-validator');

const routes = (app) => {
    const { modify, POST, PUT, DELETE, GET, GETID, writeFile, POSTSIGNIN, SIGNUP } = require('./utility')(app)
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
    POSTSIGNIN('/signin', 'database.json', 'users');
    SIGNUP('/signup', 'database.json', 'users');
    
    //----------------
    GET('/registeredStudents', 'registration', 'students');
    
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