const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static("public"));

const noteRoutes = require("./controllers/noteController")
app.use("/notes", noteRoutes)

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.listen(3000, function () {
    console.log("Listening on port 3000!")
})