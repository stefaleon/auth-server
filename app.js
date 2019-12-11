const express = require("express");

const app = express();

app.get("/", (req, res) => res.json({ msg: "This is the Auth API" }));

module.exports = app;
