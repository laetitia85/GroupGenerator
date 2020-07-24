const fs = require("fs");
let MongoClient = require("mongodb").MongoClient;
let url = "mongodb://localhost:27017/dbgenerator";

let db
const dbName = "dbgenerator";

MongoClient.connect(url, function (err, client) {
    if (err) return console.log(err);
    console.log("Database created!")

    db = client.db(dbName);

    db.createCollection("students", function (err, res) {
        if (err) throw err;
        console.log("collection created !");
        client.close();
    });

    db.createCollection("group", function (err, res) {
        if (err) throw err;
        console.log("collection created !");
        client.close();
    });
});
