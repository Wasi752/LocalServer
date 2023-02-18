const fs = require("fs")
const { body, check, validationResult } = require('express-validator');

const allFunctions = (app) => {
    const modify = (dbName, callBack, res) => fs.readFile(dbName, 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const result = callBack(allData)
        res.send(result)
    });
    const GET = (rurl, dbName, prop) => app.get(rurl, (req, res) => {
        modify(dbName, (data) => {
            return data[prop];
        }, res);
    });
    const GETID = (rurl, dbName, prop) => app.get(rurl, (req, res) => {
        modify(dbName, (data) => {
            const InfoByID = data[prop].filter(x => x.id == req.params.id)[0];
            return InfoByID;
        }, res);
    });

    const POST = (rurl, dbName, prop) => app.post(rurl, (req, res) => {
        modify(dbName, (allData) => {
            const postData = req.body;
            postData.id = allData[prop].length + 1;
            allData[prop].push(postData)
            writeFile(dbName, allData)
            return postData;
        }, res)
    })
    const PUT = (rurl, dbName, prop, arr) => app.put(rurl, (req, res) => {
        modify(dbName, (allData) => {
            const dataByID = allData[prop].filter(x => x.id == req.params.id)[0];
            arr.forEach((prop) => dataByID[prop] = req.body[prop]);
            writeFile(dbName, allData);
            return dataByID;
        }, res)
    })
    const DELETE = (rurl, dbname, prop) => app.delete(rurl, (req, res) => {
        modify(dbname, (allData) => {
            allData[prop] = allData[prop].filter(x => x.id != req.params.id);
            writeFile(dbname, allData);
        }, res)
    })
    const writeFile = (dbName, data) => fs.writeFile(dbName, JSON.stringify(data), () => { });
    // ============== --------------- ==============
    const POSTSIGNIN = (rurl, dbName, prop) => app.post(rurl, (req, res) => {
        fs.readFile(dbName, "utf8", (err, data) => {
            const allData = JSON.parse(data);
            const userData = req.body;
            const fusers = allData[prop]
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
    const SIGNUP = (rurl, dbName, prop) => app.post(rurl, (req, res) => {
        fs.readFile(dbName, "utf8", (err, data) => {
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
            allData[prop].push(userData);
            writeFile(dbName, allData);
            res.send(userData);
        });
    });
    const STUDENTREG = (rurl, dbName, prop, prop2) => app.post(rurl, (req, res) => {
        fs.readFile(dbName, "utf8", (err, data) => {
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
                IFELSE(req.body.name[prop2] < 5, 'Name must be contain atleast 5 Characters')
                IFELSE('', '', `${req.body.password}.length === 0`, 'Password is empty');
                IFELSE('', '', !uppercasePassword, 'At least one Uppercase');
                IFELSE('', '', !lowercasePassword, 'At least one Lowercase');
                IFELSE('', '', !digitsPassword, 'At least one digit');
                IFELSE('', '', !specialCharPassword, 'At least one Special Characters');
                IFELSE('', '', !minLengthPassword, 'At least minumum 8 characters');
                IFELSE('', '', req.body.confirmPassword !== req.body.password, 'Confirm password is not matched');
                IFELSE('', '', `${req.body.email}.length < 10`, 'E-mail is not valid');
                IFELSE('', '', !validEmail, 'Email Addre must be in valid formate with @ symbol')
                IFELSE('', '', req.body.mobileNumber < 11, 'Mobile number must be 11 digit with in valid formate');
                IFELSE('', '', !validNumber, 'Mobile Number not valid');
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
            reqData.id = allData[prop].length + 1;
            fs.writeFile(`public/student/${reqData.id}.jpeg`, buffer, () => { });
            reqData.image = `${reqData.id}.jpeg`;
            allData[prop].push(reqData);
            writeFile(dbName, allData)
            res.send(JSON.stringify(reqData));
        });
    });
    const CHECK = (a, miN, maX, barta) => check(a).isLength({ miN, maX }).withMessage(barta);
    const CHECK2 = (a, miN, maX, barta, barta2) => check(a).isLength({ miN, maX }).withMessage(barta).matches(/\d/).withMessage(barta2);
    const CHECK3 = (a, barta) => check(a).custom((value, { req }) => value === req.body.password).withMessage(barta);

    const POSTUSER = (rurl, dbName, prop) =>
        app.post(rurl,
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
                fs.readFile(dbName, 'utf8', (err, data) => {
                    const allData = JSON.parse(data)
                    const userData = req.body;
                    userData.id = allData[prop].length + 1;
                    allData[prop].push(userData)
                    writeFile(dbName, allData)
                    res.send(userData)
                })
            })
    return { writeFile, modify, GET, GETID, POST, PUT, DELETE, POSTSIGNIN, SIGNUP, STUDENTREG, POSTUSER, CHECK, IFELSE }
}
module.exports = allFunctions;