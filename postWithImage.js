
const POSTWithImage = (rurl, dbName, prop ) => app.post(rurl, (req, res) => {
    modify(dbName, (data) => {
        const reqData = req.body;
        if (reqData.name.length < 5) {
            res.status(400).send(JSON.stringify({
                error: "Name must be contain atleast 5 Characters"
            }));
            return;
        }
        const rawImageString = reqData.image.replace(/^data:image\/jpeg;base64,/, "");
        const buffer = Buffer.from(rawImageString, "base64");
        reqData.id = data[prop].length + 1;
        fs.writeFile(`public/staff/${reqData.id}.jpeg`, buffer, () => { });
        reqData.image = `${reqData.id}.jpeg`;
        data[prop].push(reqData);
        writeFile(dbName, data)
        return reqData;
    }, res);
});
const writeFile = (dbName, data, folderName) => fs.writeFile(dbName, JSON.stringify(data), () => { });

const POSTEMPLOYEE = (rurl, dbName, prop, arr) => app.post(rurl, (req, res) => {
    modify(dbName, (allData) => {
        const postData = req.body;
        if (postData[arr].length < 5) {
            res.status(400).send(JSON.stringify({
                error: "Name must be contain atleast 5 Characters"
            }));
            return;
        }
        const rawImageString = postData.image.replace(/^data:image\/jpeg;base64,/, "");
        const buffer = Buffer.from(rawImageString, "base64");
        postData.id = allData[prop].length + 1;
        writeFile('', '', `${folderName}${postData.id}.jpeg`, buffer, () => { });
        postData.image = `${postData.id}.jpeg`;
        allData[prop].push(postData)
        writeFile(dbName, allData)
        return postData;
    }, res)
})
