const express = require("express");
const mongoose = require("mongoose");
const config = require("./config/config.json");
const db = require("./config/database.json");

const cors = require("cors");
const { errors } = require('celebrate');
var uri = `mongodb://${db.development.host}:${db.development.port}/${db.development.database}`;

const app = express();

mongoose.connect(uri);
mongoose.connection.on("error", (err) => console.log(err));
mongoose.connection.on("open", () => console.log("Successfully connected "));

app.use(express.static("./uploads"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require("./routes/index"));
app.use(errors())
app.listen((port = config.port), () => {
    console.log("Connected ");
});