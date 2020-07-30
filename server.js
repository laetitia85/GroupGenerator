const express = require("express");
const app = express();
const fetch = require("node-fetch");
const fs = require("fs");
const ejs = require("ejs");
const bodyParser = require("body-parser");
const qs = require('querystring');




app.use('/public', express.static('public'));


//CREATION D'UNE ROUTE 
app.get('/students', async function (req, res) {
    let rec = await fetch(`http://localhost:8000/students`);
    let testRec = await rec.json();
    //console.log(testRec);
    // let numberAleaStudent = testRec[Math.floor(Math.random() * testRec.length)];
    // console.log(numberAleaStudent);







    res.status(200);
    //res.send(testRec);
    const ejs_file = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');
    const html = ejs.render(ejs_file, {
        studentsAAA: testRec
    });
    res.send(html);
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/students', async function (req, res) {

    fetch(`http://localhost:8000/students`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: req.body.name })
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (success) {
            console.log('Request success: ', success);
        })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });
    res.redirect('/students');
});

//ROUTE POUR LE GROUPE

app.get('/groups', async function (req, res) {
    let rec = await fetch(`http://localhost:8000/students`);
    let testRec = await rec.json();

    let testRecPro = await fetch(`http://localhost:8000/groups`);
    testRecPro = await testRecPro.json();
    console.log(testRecPro);


    res.status(200);
    const ejs_file = fs.readFileSync(__dirname + '/groups.ejs', 'utf-8');
    const html = ejs.render(ejs_file, {
        groupsAAA: testRecPro
    });
    res.send(html);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/groups', async function (req, res) {
    console.log("GET /groups")
    let rec = await fetch(`http://localhost:8000/groups`);
    let testRecProj = await rec.json();
    console.log(testRecProj);
    // let listProject = [];
    // console.log(listProject.push(testRecProj));
    // testRecProj.forEach(element => {console.log(element.name);
    
    res.redirect('/groups');
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/groups', async function (req, res) {
    let rec = await fetch(`http://localhost:8000/students`);
    let testRec = await rec.json();
    //console.log(testRec);
    let aleaListStudents = testRec.sort(() => Math.random() - 0.5);
    //console.log(aleaListStudents);
    let aleaListStudentsNbr = aleaListStudents.slice(0, req.body.nbr);
    //console.log(aleaListStudentsNbr);
    aleaListStudentsNbr.forEach(element => {
        console.log(element.name);
    });

    fetch(`http://localhost:8000/groups`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: req.body.project,
            students: aleaListStudentsNbr
        },
        )
    })
        .then(function (response) {
            return response.json();
        })
        .then(function (success) {
            console.log('Request success: ', success);
        })
        .catch(function (error) {
            console.log('Request failure: ', error);
        });
    res.redirect('/groups');
});




//ECOUTE DU PORT
app.listen(8080, () => {
    console.log('Server app listening on port 8080')
});
