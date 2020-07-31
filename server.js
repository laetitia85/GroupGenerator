const express = require('express');
const app = express();
const fetch = require('node-fetch');
let fs = require('fs');
let ejs = require('ejs');
const bodyParser = require('body-parser');
const qs = require('querystring');


async function pdt() {
let cc = await fetch('http://localhost:8000/students');
let jam = await cc.json();
return jam;
}

app.get('/students', async function (req,res) {
    let rec = await fetch ('http://localhost:8000/students');
    let lol = await rec.json();
    res.status(200);
    // console.log(lol);

        const ejs_file = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');
        const html = ejs.render(ejs_file, {
            user: lol,
        })

        res.send(html);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));


app.post('/students', async function (req,res) {


 fetch('http://localhost:8000/students', {
    method: 'POST',
    headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json'
    },

   body: JSON.stringify({name: req.body.name})
  
})
    .then(function (response) {
        return response.json();
})
    .then(function (success) {
        console.log('Request success: ', success)
})
    .catch(function(error)  {
        console.log('Request failure: ', error);
});
res.redirect('/students');

});

app.get('/groups', async function (req,res) {
    let recup = await fetch ('http://localhost:8000/groups');
    let cva = await recup.json();
    res.status(200);
    // console.log(lol);

        const ejs_file = fs.readFileSync(__dirname + '/groups.ejs', 'utf-8');
        const html = ejs.render(ejs_file, {
            user: cva,
        })

        res.send(html);
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.post('/groups', async function (req,res) {
    // console.log(req.body.name);
        let recStudent = await pdt();
        let tab = [];
        let tab1 = [];

        while(recStudent.length > 0) {
            let alea = Math.floor (Math.random() * recStudent.length);
            tab.push(recStudent[alea].name);
            recStudent.splice(alea, 1);
            if (tab.length == req.body.nbr) {
                tab1.push(tab)
                tab = [];
            }
        }
        if (tab.length > 0 ){
            tab1.push(tab);
        }

        await fetch('http://localhost:8000/groups', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                name: req.body.project,  
                number : req.body.nbr,
                list : tab1})
            })



        .then(function (response) {
            return response.json();
    })
        .then(function (success) {
            console.log('Request success: ', success)
    })
        .catch(function(error)  {
            console.log('Request failure: ', error);
    });

    res.redirect('/groups');

});


app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
    });
    