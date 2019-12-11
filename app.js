const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => res.json({ msg: "This is the Auth API" }));

module.exports = app;
