const express = require("express");
const app = express();
const fetch = require ("node-fetch");





//CREATION D'UNE ROUTE 
app.get('/students', async function (req, res) {
    let rec = await fetch(`http://localhost:8000/students`);
    let testRec = await rec.json();
    res.status(200);
    res.send(testRec);

});


//ECOUTE DU PORT
app.listen(8080, () => {
    console.log('Server app listening on port 8080')
});
