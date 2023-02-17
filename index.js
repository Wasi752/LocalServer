const express = require('express')
const app = express()
const port = 3001
const bodyParser = require('body-parser');
const cors = require("cors");
const router = require("./router")
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json())
app.use(express.static("public"))
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, // <= Accept credentials (cookies) sent by the client
}));

router(app)

app.listen(port, () => {
    console.log(`App Listening on port ${port}`)
})