const express = require('express');
const router = express.Router();
const fs = require('fs');
const { title } = require('process');

router.get("/notes", (req, res) => {
    fs.readFile("../db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("ERROR");
            throw err;
        } else {
            const noteData = JSON.parse(data);
            res.json(noteData);
        }
    })
})

router.post("/notes", (req,res)=>{
    fs.readFile("../db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("oh no!")
            throw err
        } else {
            const noteData = JSON.parse(data);
            noteData.push(req.body);
            fs.writeFile("./db.json", JSON.stringify(noteData, null, 4), (err) => {
                if (err) {
                    res.status(500).send("oh no!")
                    throw err;
                } else {
                    res.send("data added!");
                }
            })
        }
    })
});

router.delete("/notes", (req, res) => {
    fs.readFile("../db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("oh no!")
            throw err;
        } else {
            let noteData = JSON.parse(data);
            noteData = noteData.filter((note) => {
                if (note.title == req.params.title) {
                    return false;
                } else {
                    return true;
                }
            });
            fs.writeFile("./db.json", JSON.stringify(noteData, null, 4), (err) => {
                if (err) {
                    res.status(500).send("oh no!");
                    throw err;
                } else {
                    res.send("data deleted.");
                }
            })
        }
    })
})

module.exports = router;