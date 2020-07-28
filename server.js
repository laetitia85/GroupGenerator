const express = require('express');
const app = express();
const fetch = require('node-fetch');
let fs = require('fs');
let ejs = require('ejs');
const bodyParser = require('body-parser');
const qs = require('querystring');




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
console.log(req.body.name);

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




app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
    });
    