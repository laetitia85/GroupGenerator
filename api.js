const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/dbgenerator';
const port = process.env.PORT || 8000;
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let fs = require("fs");
let studentTab = [];
let db;
const dbName = 'dbgenerator';



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
        console.log(student)
        studentTab.push(student);
        dbtest.collection("students").insertOne(student, function (err, result) {
            if (err) throw err;
            console.log("1 document inserted");
            res.json({
              msg:"Ok"
            });
        });
      });

    app.delete('/students/:name' , function (req, res) {
      dbtest.collection("students").deleteOne({name : req.params.name}, function (err, result) {
        if (err) throw err;
        console.log("1 name delete");
        res.send("ok");
    
    });
    });

    app.get('/groups', async function(req, res){
      let test = await dbtest.collection("groups").find().toArray()
      console.log(test)
      res.json(test);
  });

  app.get('/groups/:name' , function (req, res) {
    dbtest.collection("groups").findOne({name : req.params.name}, function (err, result) {
      if (err) throw err;
      console.log("1 name inserted");
      res.send("ok");
  });
  });

  app.post('/groups', function (req, res) {
    let student = req.body;
    studentTab.push(student);
    res.send("student added");
    dbtest.collection("groups").insertOne(student, function (err, result) {
        if (err) throw err;
        console.log("1 document inserted");
        res.json({
          msg:"Ok"
        });
    });
  });

  app.delete('/groups/:name' , function (req, res) {
    dbtest.collection("groups").deleteOne({name : req.params.name}, function (err, result) {
      if (err) throw err;
      console.log("1 name delete");
      res.send("ok");
  });
  });
});

app.listen(port, () => {
    console.log('Server app listening on port' + port)
});
