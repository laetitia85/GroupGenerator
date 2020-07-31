const fs = require("fs");
let MongoClient = require("mongodb").MongoClient;                    //connexion à Mongo Client
let url = "mongodb://localhost:27017/dbgenerator";                   //connexion à l'adresse url pour se connecter à la collection nommée dbgenerator

let db
const dbName = "dbgenerator";                                        //initialisation de la base de donnée dans une variable

MongoClient.connect(url, function (err, client) {                    //création de la base de données
    if (err) return console.log(err);
    console.log("Database created!")

    db = client.db(dbName);                                          

    // db.createCollection("students", function (err, res) {
    //     if (err) throw err;
    //     console.log("collection created !");
    //     client.close();
    // });

    db.createCollection("group", function (err, res) {               //création de la collection "group"
        if (err) throw err;  
        console.log("collection created !");
        client.close();
    });
});
