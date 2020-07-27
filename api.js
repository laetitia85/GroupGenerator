const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/dbgenerator';
const port = process.env.PORT || 8000;
const express = require("express");
<<<<<<< HEAD
const bodyParser = require ("body-parser");
const app = express();
let fs = require ("fs");
=======
const bodyParser = require("body-parser");
const app = express();
let fs = require("fs");
>>>>>>> 79f15222ec9a1b766d0f9184051cf7e3696daa98
let studentTab = [];
let db;
const dbName = 'dbgenerator';


<<<<<<< HEAD
MongoClient.connect(url, function(err, client) {
    if (err) throw err;

    db = client.db(dbName);
    var dbtest = client.db("dbgenerator");
    var myobj = JSON.stringify(studentTab);
    
    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended : true }));
    
    app.post('/students',function (req,res){
      let student = req.body;
      studentTab.push(student);
      console.log(studentTab);
      res.send("student added");
      dbtest.collection("students").insertOne(student, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
      });

          app.get('/students', (req, res) => {
          res.set('Content-Type', 'text/html');
          res.send()
            
      
    });
  });
});
app.listen(port,() => {
  console.log('Server app listening on port' + port)
});
  
=======

MongoClient.connect(url, function (err, client) {
    if (err) throw err;

    db = client.db(dbName);
    var dbtest = client.db("dbgenerator");
    var myobj = JSON.stringify(studentTab);


    app.get('/students', async function(req, res){
        let test = await dbtest.collection("students").find().toArray()
        console.log(test)
        res.json(test);
    });

    app.use(bodyParser.json());
    app.use(express.urlencoded({ extended: true }));

    app.post('/students', function (req, res) {
        let student = req.body;
        studentTab.push(student);
        res.send("student added");
        dbtest.collection("students").insertOne(student, function (err, res) {
            if (err) throw err;
            console.log("1 document inserted");
            res.send("ok");
        });
    });
});

app.listen(port, () => {
    console.log('Server app listening on port' + port)
});
>>>>>>> 79f15222ec9a1b766d0f9184051cf7e3696daa98
