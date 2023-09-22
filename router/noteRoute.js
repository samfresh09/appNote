const express = require("express");

const router = express.Router();

router.get("/", (req, res) => {
    res.status(200).redirect("/acceuil")
})

router.get("/acceuil", (req, res) => {
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        } else {
            connection.query("SELECT * FROM note", [], (erreur, result) => {
                if (erreur) {
                    console.log(erreur);
                } else {
                    res.status(200).render("index", { result })
                }
            })

        }
    })

})
router.post("/formule", (req, res) => {
    console.log(req.body);

    let id = req.body.id === "" ? null : req.body.id;
    let title = req.body.title;
    let contenu = req.body.contenu;



    let requete = id === null ? "INSERT INTO note(id,title,contenu) VALUES(?,?,?)" : "UPDATE note set title=?, contenu=? WHERE id=?";

    console.log(id);
    let donnee = id === null ? [null, title, contenu] : [title, contenu, id]
    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        } else {
            connection.query(requete, donnee, (erreur, reponse) => {
                if (erreur) {
                    console.log(erreur);
                } else {
                    res.redirect("/acceuil")

                }
            })

        }
    })
})

router.delete("/supprime/:id", (req, res) => {
    let id = req.params.id

    req.getConnection((erreur, connection) => {
        if (erreur) {
            console.log(erreur);
        } else {
            connection.query("DELETE FROM note WHERE id=?", [id], (erreur, reponse) => {
                if (erreur) {
                    console.log(erreur);
                } else {
                    res.status(200).json({ routeRacine: "/" })
                }
            })

        }
    })
})

module.exports = router;