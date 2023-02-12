const fs = require("fs")

const utility = (app) =>{
const modify2 = (dbName, callBack, res) => fs.readFile(dbName, 'utf8', (err, data) => {
    const allData = JSON.parse(data)
    const result = callBack(allData)
    res.send(result)
});
const postModify = (rurl, dbName, prop) => app.post(rurl, (req, res) => {
    modify2(dbName, (allData) => {
        const boardData = req.body;
        boardData.id = allData[prop].length + 1;
        allData[prop].push(boardData)
        writeFile(dbName, allData)
    }, res)
})
const putModify = (rurl, dbName, prop, arr) => app.put(rurl, (req, res) => {
    modify2(dbName, (allData) => {
        const dataByID = allData[prop].filter(x => x.id == req.params.id)[0];
        arr.forEach((prop) => dataByID[prop] = req.body[prop]);
        writeFile(dbName, allData);
    }, res)
})
const deleteModify = (rurl, dbname, prop) => app.delete(rurl, (req, res) => {
    modify2(dbname, (allData) => {
        allData[prop] = allData[prop].filter(x => x.id != req.params.id);
        writeFile(dbname, allData)
    }, res)
})
const writeFile = (dbName, data) => fs.writeFile(dbName, JSON.stringify(data), () => { });
return { writeFile, deleteModify, postModify, putModify, modify2 }
}
module.exports = utility;