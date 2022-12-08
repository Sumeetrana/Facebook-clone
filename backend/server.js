const cors = require("cors");
const dotenv = require("dotenv");
const express = require("express");
const mongoose = require("mongoose");
const { readdirSync } = require("fs");

const app = express();
dotenv.config();

// middlewares
app.use(cors());
app.use(express.json());

// database
mongoose.connect(process.env.DB_URL)
  .then(() => console.log("Databse connected successfully.."))
  .catch((err) => console.log(err))

// routes
// dynamically adds all the routes from routes folder 
readdirSync('./routes').map(file => app.use("/", require("./routes/" + file)));

app.listen(process.env.PORT || 6060, () => {
  console.log("server is running...");
});
