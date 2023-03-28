const fs = require("fs")
const { validationResult } = require('express-validator');

const allFunctions = (app) => {
    const modify = (dbName, callBack, res) => fs.readFile('databases/' + dbName, 'utf8', (err, data) => {
        const allData = JSON.parse(data)
        const result = callBack(allData)
        res.send(result)
    });
    const writeFile = (dbName, data) => fs.writeFile('databases/' + dbName, JSON.stringify(data), () => { });
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

    const POST = (rurl, dbName, prop, arr) => app.post(rurl, 
        // arr.map(x => x[1]),
        (req, res) => {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }
            modify(dbName, (allData) => {
                const postData = req.body;
                postData.id = allData[prop].length + 1;
                allData[prop].push(postData)
                writeFile(dbName, allData)
                return postData;
            }, res)
        })
    const PUT = (rurl, dbName, prop, arr) => app.put(rurl, 
        //arr.map(x => x[1]), 
        (req, res) => {
            // const errors = validationResult(req);
            // if (!errors.isEmpty()) {
            //     return res.status(400).json({ errors: errors.array() });
            // }
            modify(dbName, (allData) => {
                const dataByID = allData[prop].filter(x => x.id == req.params.id)[0];
                arr.map(x => x[0]).forEach((prop) => dataByID[prop] = req.body[prop]);
                writeFile(dbName, allData);
                return dataByID;
            }, res)
        })
    const DELETE = (rurl, dbname, prop) => app.delete(rurl, (req, res) => {
        modify(dbname, (allData) => {
            allData[prop] = allData[prop].filter(x => x.id != req.params.id);
            writeFile(dbname, allData);
        }, res)
    });

    const createCRUD = (baseRoute, dbName, tableName, properties) => {
        GET(baseRoute, dbName, tableName);
        GETID(baseRoute + '/:id', dbName, tableName);
        POST(baseRoute, dbName, tableName, properties);
        PUT(baseRoute + '/:id', dbName, tableName, properties);
        DELETE(baseRoute + '/:id', dbName, tableName)
    }
    return { writeFile, createCRUD }
}
module.exports = allFunctions;