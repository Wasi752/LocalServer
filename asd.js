
app.get('/students/:id', (req, res) => {
    fs.readFile("employeeDatabase", 'utf8', (err, data) => {
        const allData = JSON.parse(data) 
        const studentInfoByID = allData.students.find(x => x.id == req.params.id); 
        console.log(studentInfoByID);
        res.send(JSON.stringify(studentInfoByID))
    })
})
app.put('/students/:id', (req, res) => {
    fs.readFile("employeeDatabase", 'utf8', (err, data) => {
        const allData = JSON.parse(data) 
        const studentInfoByID = allData.students.find(x => x.id == req.params.id);
        studentInfoByID.name_arabic = req.body.name_arabic;
        allData.students.push(studentInfoByID) 
        fs.writeFile("employeeDatabase", JSON.stringify(allData), () => { })
        res.send(JSON.stringify(studentInfoByID))
    }) 
})