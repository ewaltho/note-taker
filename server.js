const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const port = process.env.PORT || 3001;

app.use(express.json());
app.use(express.urlencoded({ extended: true}));

app.use(express.static("public"));

const noteRoutes = require("./controllers/noteController")
app.use("/", noteRoutes)

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "./public/notes.html"))
});

app.listen(port, function () {
    console.log(`Listening on port ${port}!`)
})