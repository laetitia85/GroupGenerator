const MongoClient = require('mongodb').MongoClient;               //Appel à la bibliothèque de node pour récupérer le module mongodb
const url = 'mongodb://localhost:27017/dbgenerator';              //spécification de l'url pour ce connecter à MongoDb compass
const port = process.env.PORT || 8000;                            //spécification du port de connexion  
const express = require("express");                               //connexion à la bibliothèque express
const bodyParser = require("body-parser");                        //connexion à la bibliothèque "body-parser" pour lire le contenu du body
const app = express();                                            //initialisation d'une variable pour appeler la fonction express
let fs = require("fs");                                           //initialisation d'une variable fs pour appeler la fonction fs pour lire les fichiers émises par la bdd
let studentTab = [];                                              //initialisation d'une variable pour pousser les données
let db;                                                           //initialisation d'une variable 
const dbName = 'dbgenerator';                                     //initialisation d'une variable nommée au nom de la collection de la bdd



MongoClient.connect(url, { useUnifiedTopology: true }, function (err, client) {  
    if (err) throw err;                                           //connexion à la base de donnée de la collection dbgenerator
    db = client.db(dbName);                                       //Inialisation d'une variable db qui prend la valeur de la collection de la base de données dbgenerator
    var dbtest = client.db("dbgenerator");                        //Inialisation d'une variable db qui prend la valeur de la collection de la base de données dbgenerator

   

    //Student                                                      //creation de l'url student pour trouver un nom d'étudiant
    app.get('/students', async function (req, res) {
        let test = await dbtest.collection("students").find().toArray()  //Récupération d'une seule données depuis la collection students
        res.json(test);                                     
    });

    app.use(bodyParser.json());                                    //Route permettant de lire le contenu de ce qu'il y a dans le body
    app.use(express.urlencoded({ extended: true }));

    app.post('/students', function (req, res) {                    //Route pour intégrer un nom d'étudiant dans la collection student
        let student = req.body;
        studentTab.push(student);                                  //intégration des noms d'étudiants dans un array
        console.log(studentTab);                                   //contrôle
        dbtest.collection("students").insertOne(student, function (err, result) {
            if (err) throw err;
            console.log("1 document inserted");                    //contrôle
            res.json({
                msg : "Ok"
            });
        });
    });
    app.delete('/students/:name', function (req, res) {             //Route effacer un étudiant de la collection Student
        dbtest.collection("students").deleteOne({ name: req.params.name }, function (err, result) {
            if (err) throw err;
            console.log("1 document deleted");
            res.send("OK");
        });
    });

    //Group

    app.get('/groups', async function (req, res) {                  //Route pour transmettre les données de la collection groups
        console.log("GET /groups")
        let test = await dbtest.collection("groups").find().toArray();
        console.log(test);
        res.json(test);
    });

    app.get('/groups/:name', async function (req, res) {            //Route pour transmettre le nom d'un projet dans la collection groups
        let test = await dbtest.collection("groups").insertOne({ name: req.params.name }, function (err, result) {
            if (err) throw err;
            res.json(test);
        });
    });

    app.post('/groups', async function (req, res) {                //Route pour récupérer les données de la collection groups
        let group = req.body;
        console.log(group);
        dbtest.collection("groups").insertOne(group, function (err, result) {
            if (err) throw err;
            console.log("1 group inserted");
            res.json({
                msg : "Ok"
            });
        })
    })

    app.delete('/groups/:name', function (req, res) {              //Route pour effacer le nom d'un projet
        dbtest.collection("groups").deleteOne({ name: req.params.name }, function (err, result) {
            if (err) throw err;
            console.log("1 document deleted");
            res.send("OK");
        })
    });
});

app.listen(port, () => {
    console.log('Server app listening on port' + port)
});

/*--------------------------------
/**
 * @summary fonction test pour apprendre un commentaire de fonction
 * @returns x + y
 * @param {*} x 
 * @param {*} y 
 */
let add = (x, y) =>{
return x + y
}



