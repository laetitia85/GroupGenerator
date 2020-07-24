
const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017/dbgenerator';
const dbName = 'dbgenerator';



MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbtest = db.db("dbgenerator");
    var myobj = { name1: "Laetitia", name2: "Hugo" };
    dbtest.collection("students").insertOne(myobj, function(err, res) {
      if (err) throw err;
      console.log("1 document inserted");
      db.close();
    });
  });


  