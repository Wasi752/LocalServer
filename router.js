const { check } = require("express-validator");
const fs = require("fs")
const router = require('express').Router();

const { createCRUD, writeFile } = require('./allFunction')(router)

router.get('/', (req, res) => {
    res.send('Bismillahir Rahmanir Rahim')
})
createCRUD('/employees', 'employeeDatabase.json', 'employees', [
    ['name', check('name').exists().withMessage('name must be provided').isLength({min : 1, max : 20}).withMessage('name must be between 1 to 20 chars')],
    ['father', check('father').exists().withMessage('father must be provided').isLength({min : 1, max : 20}).withMessage('father must be between 1 to 20 chars')],
    ['mother', check('mother').exists().withMessage('mother must be provided').isLength({min : 1, max : 20}).withMessage('mother must be between 1 to 20 chars')],
    ['present_address', check('present_address').exists().withMessage('present_address must be provided').isLength({min : 1, max : 50}).withMessage('present_address must be between 1 to 20 chars')],
    ['permanent_address', check('permanent_address').exists().withMessage('permanent_address must be provided').isLength({min : 1, max : 50}).withMessage('permanent_address must be between 1 to 20 chars')],
    ['academic_achievement', check('academic_achievement').exists().withMessage('academic_achievement must be provided').isLength({min : 1, max : 50}).withMessage('academic_achievement must be between 1 to 20 chars')],
    ['languages_skills', check('languages_skills').exists().withMessage('languages_skills must be provided').isLength({min : 1, max : 30}).withMessage('languages_skills must be between 1 to 20 chars')],
    ['designation', check('designation').exists().withMessage('designation must be provided').isLength({min : 1, max : 20}).withMessage('designation must be between 1 to 20 chars')],
    ['contact_no', check('contact_no').exists().withMessage('contact_no must be provided').isLength({min : 1, max : 20}).withMessage('contact_no must be between 1 to 20 chars')],
    ['e_mail', check('e_mail').exists().withMessage('e_mail must be provided').isLength({min : 1, max : 20}).withMessage('e_mail must be between 1 to 20 chars')],
    ['room_no', check('room_no').exists().withMessage('room_no must be provided').isLength({min : 1, max : 20}).withMessage('room_no must be between 1 to 20 chars')],
    ['image', check('image').exists().withMessage('image must be provided').isLength({min : 1, max : 20}).withMessage('image must be between 1 to 20 chars')],
    ['nationality', check('nationality').exists().withMessage('nationality must be provided').isLength({min : 1, max : 20}).withMessage('nationality must be between 1 to 20 chars')],
    ['brith', check('brith').exists().withMessage('brith must be provided').isLength({min : 1, max : 20}).withMessage('brith must be between 1 to 20 chars')],
    ['nid', check('nid').exists().withMessage('nid must be provided').isLength({min : 1, max : 20}).withMessage('nid must be between 1 to 20 chars')],
]);
// createCRUD('/boards', 'employeeDatabase.json', 'boards', ['name_arabic', 'name_bangala', 'name_english', 'address']);
// createCRUD('/fazilatResult', 'madrasaResult.json', 'fazilatResult', ['madrasa', 'name', 'fname']);
// createCRUD('/result', 'madrasaResult.json', 'results', ['mname', 'name']);
// createCRUD('/madrasa', 'registration.json', 'madrasas', ['name_arabic', 'name_bangala', 'name_english', 'muhtamim']);
// createCRUD('/studentRegistration', 'registration.json', 'students', ['name', 'name_arabic', 'name_english', 'father', 'brith'])
// createCRUD('/users', 'madrasa.json', 'users', ['name', 'password', 'mobile']);
// ======== ---------------------------- ===========

// router.post('/studentRegistration', (req, res) => {
//     fs.readFile('registration.json', "utf8", (err, data) => {
//         const allData = JSON.parse(data)
//         const reqData = req.body;
//         const getError = () => {
//             const uppercaseRegExp = /(?=.*?[A-Z])/;
//             const lowercaseRegExp = /(?=.*?[a-z])/;
//             const digitsRegExp = /(?=.*?[0-9])/;
//             const specialCharRegExp = /(?=.*?[#?!@$%^&*-])/;
//             const minLengthRegExp = /.{8,}/;
//             const uppercasePassword = uppercaseRegExp.test(req.body.password);
//             const lowercasePassword = lowercaseRegExp.test(req.body.password);
//             const digitsPassword = digitsRegExp.test(req.body.password);
//             const specialCharPassword = specialCharRegExp.test(req.body.password);
//             const minLengthPassword = minLengthRegExp.test(req.body.password);
//             const validEmailAddress = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//             const validEmail = validEmailAddress.test(req.body.email);
//             const validMobileNumber = /^[0-9]*$/;
//             const validNumber = validMobileNumber.test(req.body.mobileNumber);
//             IFELSE(req.body.name.length < 5, 'Name must be contain atleast 5 Characters')
//             IFELSE('', '', `${req.body.password}.length === 0`, 'Password is empty');
//             IFELSE('', '', !uppercasePassword, 'At least one Uppercase');
//             IFELSE('', '', !lowercasePassword, 'At least one Lowercase');
//             IFELSE('', '', !digitsPassword, 'At least one digit');
//             IFELSE('', '', !specialCharPassword, 'At least one Special Characters');
//             IFELSE('', '', !minLengthPassword, 'At least minumum 8 characters');
//             IFELSE('', '', req.body.confirmPassword !== req.body.password, 'Confirm password is not matched');
//             IFELSE('', '', `${req.body.email}.length < 10`, 'E-mail is not valid');
//             IFELSE('', '', !validEmail, 'Email Addre must be in valid formate with @ symbol')
//             IFELSE('', '', req.body.mobileNumber < 11, 'Mobile number must be 11 digit with in valid formate');
//             IFELSE('', '', !validNumber, 'Mobile Number not valid');
//             return "";
//         }
//         const error = getError();
//         if (error !== "") {
//             return res.status(400).send(JSON.stringify({
//                 error: error
//             }))
//         }
//         const rawImageString = reqData.image.replace(/^data:image\/jpeg;base64,/, "");
//         const buffer = Buffer.from(rawImageString, "base64");
//         reqData.id = allData.students.length + 1;
//         fs.writeFile(`public/student/${reqData.id}.jpeg`, buffer, () => { });
//         reqData.image = `${reqData.id}.jpeg`;
//         allData.students.push(reqData);
//         writeFile('registration.json', allData)
//         res.send(JSON.stringify(reqData));
//     });
// });
module.exports = router;