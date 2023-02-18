const fs = require("fs")
const { body, check, validationResult } = require('express-validator');

const allFunctions = (app) => {
    const modify = (dbName, callBack, res) => fs.readFile('databases/' + dbName, 'utf8', (err, data) => {
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

    const POST = (rurl, dbName, prop, arr) => app.post(rurl, (req, res) => {
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
    return { writeFile, GET, GETID, POST, PUT, DELETE }
}
module.exports = allFunctions;