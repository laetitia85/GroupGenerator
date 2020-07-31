const express = require("express");                                                 //Appel à la biblithèque de node pour récupérer le module express
const app = express();                                                              //Initialisation de la variable app pour utiliser le module express
const fetch = require("node-fetch");                                                //Appel de la bibliothèque de node pour récupérer le module fetch qui permet de récupérer le contenu de l'url qui accède à la bd
const fs = require("fs");                                                           //Appel à la bibli de node pour récupérer le module fs pour lire le contenu du fichier
const ejs = require("ejs");                                                         //Appel à la bibli de node pour récupérer le module ejs pour lire le fichier.ejs
const bodyParser = require("body-parser");                                          //Appel à la biblio de node pour récupérer le module body-parser qui permet de lire le contenu du body d'un fichier
const qs = require('querystring');                                                  //? => utile pour ce projet ? Déf: Le querystringmodule fournit des utilitaires pour analyser et formater les chaînes de requête d'URL.                                       




app.use('/public', express.static('public'));                                       //Permet de lire le fichier CSS


//RÉCUPERATON DES DONNÉES DE LE ROUTE STUDENT
app.get('/students', async function (req, res) {
    let rec = await fetch(`http://localhost:8000/students`);                        //Route définie préalablement dans l'API
    let testRec = await rec.json();                                                 //Initialisation d'une variable pour récupérer les données de la route
    //console.log(testRec);
    // let numberAleaStudent = testRec[Math.floor(Math.random() * testRec.length)];
    // console.log(numberAleaStudent);







    res.status(200);
    //res.send(testRec);
    const ejs_file = fs.readFileSync(__dirname + '/index.ejs', 'utf-8');          //Lecture du fichier et intégration des données dans le fichier index
    const html = ejs.render(ejs_file, {                                           //Connexion avec un fichier au format ejs
        studentsAAA: testRec                                                      //initilisation de la variable étudiant qui apparaitra dans le HTML
    });
    res.send(html);
});
app.use(bodyParser.json());                                                       //Lecture du fichier
app.use(bodyParser.urlencoded({ extended: true }));                               //Lecture du fichier

app.post('/students', async function (req, res) {                                 //Intégration de nouveaux étudiants dans la route 

    fetch(`http://localhost:8000/students`, {                                     //Connexion à la base de données des étudiants
        method: 'POST',                                                           //On précise qu'il s'agit de la méthode POST en rapport avec le form : /action du HTML
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: req.body.name })                           //Valeur de l'input name dans le bouton du html pour intégrer un nouvel étudiant
    })
        .then(function (response) {                                             //response du serveur
            return response.json();
        })
        .then(function (success) {                                              //confirmation du bon fonctionnement
            console.log('Request success: ', success);
        })
        .catch(function (error) {                                               //récupération des erreurs
            console.log('Request failure: ', error);
        });
    res.redirect('/students');                                                  //Raffraichit la page
});

//ROUTE POUR LE GROUPE

app.get('/groups', async function (req, res) {
    let rec = await fetch(`http://localhost:8000/students`);                   //Initialisation d'une variable avec les données de la collection students
    let testRec = await rec.json();                                            //Initialisation d'une variable pour lire les données de la collection students qui sont en format json

    let testRecPro = await fetch(`http://localhost:8000/groups`);              //Initialisation d'une variable avec les données de la collection groups
    testRecPro = await testRecPro.json();                                      //Initialisation d'une variable pour lire les données de la collection groups qui sont en format json
    console.log(testRecPro);


    res.status(200);
    const ejs_file = fs.readFileSync(__dirname + '/groups.ejs', 'utf-8');      //Initialisation ejs par la lecture du fichier groups en format ejs
    const html = ejs.render(ejs_file, {                                        //Initialisation de la variable html qui intégre la variable dans le ejs
        groupsAAA: testRecPro                                                  //On associe une nouvelle variable qui se mettra dans le group.ejs
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
    
    res.redirect('/groups');                                                  //Raffraichit la page
});




app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));



app.post('/groups', async function (req, res) {
    let rec = await fetch(`http://localhost:8000/students`);
    let testRec = await rec.json();
    //console.log(testRec);
    let aleaListStudents = testRec.sort(() => Math.random() - 0.5);              //randomisation du tableau des étudiants
    //console.log(aleaListStudents);
    let aleaListStudentsNbr = aleaListStudents.slice(0, req.body.nbr);           // slice() = je prends les "n" premiers élément du tableau
    //console.log(aleaListStudentsNbr);
    aleaListStudentsNbr.forEach(element => {                                     // boucle forEach = pour chaque données du tableau donne-moi seulement le nom de l'étudiant
        console.log(element.name);
    });

    fetch(`http://localhost:8000/groups`, {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({                                                   //Association des valeurs des boutons  (valeur des inputs : name et students)
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
            console.log('Request failure: ', error);                            //récupération des erreurs
        });
    res.redirect('/groups');                                                    //Raffraichit la page
});




//ECOUTE DU PORT
app.listen(8080, () => {
    console.log('Server app listening on port 8080')
});
