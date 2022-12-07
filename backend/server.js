const cors = require("cors");
const express = require("express");
const { readdirSync } = require("fs");

const app = express();

app.use(cors());

// dynamically adds all the routes from routes folder 
readdirSync('./routes').map(file => app.use("/", require("./routes/" + file)));

app.listen(6060, () => {
  console.log("server is lestining...");
});
