const fs = require("fs")
const { body, check, validationResult } = require('express-validator');

const routes = (app) => {
    const { modify, POST, PUT, DELETE, GET, GETID, writeFile, POSTSIGNIN, SIGNUP, STUDENTREG, POSTUSER } = require('./allFunction')(app)
    //const allFunctions = require('./allFunction');
    //const { modify, GET, GETID, POST, PUT, DELETE, writeFile } = allFunctions(app)
    
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
    GET('/studentRegistration', 'registration.json', 'students');
    STUDENTREG('/studentRegistration', 'registration.json', 'students', 'length')
    PUT('/studentRegistration/:id', 'registration.json', 'students', ['name', 'name_arabic', 'name_english', 'father', 'brith']);
    DELETE('/studentRegistration/:id', 'registration', 'students');
    //----------------
    GET('/users', 'madrasa.json', 'users');
    POSTUSER('/users', 'madrasa.json', 'users');
    PUT('/users/:id', 'madrasa.json', 'users', ['name', 'password', 'mobile']);
    DELETE('/users/:id', 'madrasa.json', 'users');
}
module.exports = routes;