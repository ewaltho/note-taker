const express = require('express');
const router = express.Router();
const fs = require('fs');
const { title } = require('process');
const { v4: uuidv4 } = require("uuid");

router.get("/api/notes", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("ERROR");
            throw err;
        } else {
            const noteData = JSON.parse(data);
            res.json(noteData);
        }
    })
})

router.post("/api/notes", (req,res)=>{
    let id = uuidv4();
    let newNoteObj = {id:id, title:req.body.title, text:req.body.text};
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("oh no!")
            throw err
        } else {
            const noteData = JSON.parse(data);
            noteData.push(newNoteObj);
            fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 4), (err) => {
                if (err) {
                    res.status(500).send("oh no!")
                    throw err;
                } else {
                    console.log('data added')
                    res.send("data added!");
                }
            })
        }
    })
});

router.delete("/api/notes/:id", (req, res) => {
    fs.readFile("./db/db.json", "utf-8", (err, data) => {
        if (err) {
            res.status(500).send("oh no!")
            throw err;
        } else {
            let noteData = JSON.parse(data);
            noteData = noteData.filter((note) => {
                if (note.id == req.params.id) {
                    return false;
                } else {
                    return true;
                }
            });
            fs.writeFile("./db/db.json", JSON.stringify(noteData, null, 4), (err) => {
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