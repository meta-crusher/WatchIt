const axios = require('axios');
const express = require('express');
const cors = require('cors');
const path = require('path')
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());
app.use(cors());
// app.use(express.static(path.join(__dirname, '../build')))

const port = process.env.PORT || 8080;

let resData = null;

app.post('/postURL', (req, res) => {

    passUrl = req.body.url;
    axios.get(passUrl).then(response => {
        resData = response.data;
    }).then(() => {
        res.send(resData);
    })
})

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});