const fs = require("fs")

const utility = (app) =>{
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
 
const POST = (rurl, dbName, prop, arr) => app.post(rurl, (req, res) => {
    modify(dbName, (allData) => {
        const postData = req.body;
        if (postData[arr].length < 5) {
            res.status(400).send(JSON.stringify({
                error: "Name must be contain atleast 5 Characters"
            }));
            return;
        }
        const rawImageString = reqData.image.replace(/^data:image\/jpeg;base64,/, "");
        const buffer = Buffer.from(rawImageString, "base64");
        postData.id = allData[prop].length + 1;
        fs.writeFile(`public/staff/${postData.id}.jpeg`, buffer, () => { });
        postData.image = `${postData.id}.jpeg`;
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
return { writeFile, modify, GET, GETID, POST, PUT, DELETE,}
}
module.exports = utility;