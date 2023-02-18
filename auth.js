
const fs = require("fs")
const { check, validationResult } = require('express-validator');
const router = require('express').Router();

router.post('/signin', (req, res) => {
    fs.readFile('databases/database.json', "utf8", (err, data) => {
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
const IFELSE = (a, barta, b, barta2) => {
    if (a) {
        return barta;
    } else if (b) { return barta2; }
};
router.post('/signup', (req, res) => {
    fs.readFile('databases/database.json', "utf8", (err, data) => {
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
            IFELSE(`${req.body.username}.length < 5`, 'Name must be contain atleast 5 Characters');
            IFELSE('', '', `${req.body.password}.length === 0`, 'Password is empty');
            IFELSE('', '', !uppercasePassword, 'At least one Uppercase');
            IFELSE('', '', !lowercasePassword, 'At least one Lowercase');
            IFELSE('', '', !digitsPassword, 'At least one digit');
            IFELSE('', '', !specialCharPassword, 'At least one Special Characters');
            IFELSE('', '', !minLengthPassword, 'At least minumum 8 characters');
            IFELSE('', '', req.body.confirmPassword !== req.body.password, 'Confirm password is not matched');
            IFELSE('', '', req.body.email.length < 10, 'E-mail is not valid');
            IFELSE('', '', !validEmail, 'Email Addre must be in valid formate with @ symbol');
            return "";
        }
        const error = getError();
        if (error !== "") {
            return res.status(400).send(JSON.stringify({
                error: error
            }))
        }
        userData.id = allData[prop].length + 1;
        allData.users.push(userData);
        writeFile('databases/database.json', allData);
        res.send(userData);
    });
});
const CHECK = (a, miN, maX, barta) => check(a).isLength({ miN, maX }).withMessage(barta);
const CHECK2 = (a, miN, maX, barta, barta2) => check(a).isLength({ miN, maX }).withMessage(barta).matches(/\d/).withMessage(barta2);
const CHECK3 = (a, barta) => check(a).custom((value, { req }) => value === req.body.password).withMessage(barta);

router.post('/users',
    CHECK('name', 'min: 5', '', 'must be at least 5 chars long'),
    CHECK('email', '', '', '', 'must be a valid email address'),
    CHECK('mobile', 'min: 10', 'max : 11', 'must be exactly 11 digits long'),
    CHECK2('password', 'min: 5', 'max: 8', 'must be at least 5 chars long', 'must contain a number'),
    CHECK3('confirmPassword', 'must match password'),
    (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        fs.readFile('databases/madrasa.json', 'utf8', (err, data) => {
            const allData = JSON.parse(data)
            const userData = req.body;
            userData.id = allData.users.length + 1;
            allData.users.push(userData)
            writeFile('databases/madrasa.json', allData)
            res.send(userData)
        })
    })
    module.exports = router;