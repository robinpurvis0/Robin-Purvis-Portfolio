const express = require("express");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/public/index.html");
});

app.get("/insurance", (req, res) => {
    res.sendFile(__dirname + "/public/insurance.html");
});

app.get("/owner", (req, res) => {
    res.sendFile(__dirname + "/public/owner.html");
});

app.get("/status", (req, res) => {
    res.sendFile(__dirname + "/public/status.html");
});