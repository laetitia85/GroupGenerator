const express = require("express");
const app = express();
const fetch = require("node-fetch");
const fs = require("fs");
const ejs = require("ejs");
const qs = require('querystring');

let students = [];





//CREATION D'UNE ROUTE 
app.get('/students', async function (req, res) {
    let rec = await fetch(`http://localhost:8000/students`);
    let testRec = await rec.json();
    res.status(200);
    //res.send(testRec);


    const ejs_file = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');
    const html = ejs.render(ejs_file, {
        studentsAAA: testRec
    });
    res.send(html);

});

app.post('/student', async function (req, res) {

})


//ECOUTE DU PORT
app.listen(8080, () => {
    console.log('Server app listening on port 8080')
});
