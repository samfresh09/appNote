//initialisation des instance de module a utilise
const express = require("express");
const morgan = require("morgan");
const uuid = require("uuid");
const mysql = require("mysql")
const myConnection = require("express-myconnection");
const connection = require("express-myconnection");
const { urlencoded } = require("express");

const nodeRoute = require("./router/noteRoute");

const app = express();

//variable des information de connection sur un serveur MySQL
const optionDB = {
    host: "localhost",
    user: "root",
    password: "freshSAM1234",
    port: "3306",
    database: "nodejs_test",


}


//midleware extraction des donne du formulaire

app.use(express.urlencoded({ extended: false }));

//middleware de connection a la base de donne
app.use((myConnection(mysql, optionDB, "pool")))



//declaration du moteur de visualisation
app.set("view engine", "ejs")

app.set("views", "template")

const heureConnecter = Date().toString()

//middleware d'info sur une requete
app.use(morgan("tiny"))

app.use(nodeRoute);


app.get("/apropos", (req, res) => {
    res.status(200).render("apropos")
})

app.use((req, res) => {
    res.status(404).render("error")
})

app.listen(3001, () => {
    console.log(uuid.v4());
})

console.log("erreur de lancement du serveur");