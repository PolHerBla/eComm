const express = require("express");
const cors = require("cors");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(express.json());
app.use(cors());

app.use(express.static("public"));

app.use("/api", userRoutes);

module.exports = app;

