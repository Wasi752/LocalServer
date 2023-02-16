const fs = require("fs")

const utility = (app) => {
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
    // --------------
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
    return { writeFile, modify, GET, GETID, POST, PUT, DELETE, POSTSIGNIN }
}
module.exports = utility;