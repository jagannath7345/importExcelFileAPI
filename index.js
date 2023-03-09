const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/router");
const app = express();
const PORT = 5000;
mongoose
  .connect("mongodb://localhost:27017/testDB")
  .then(() => console.log("Database connected sucessfully"))
  .catch(() => console.log("connection failed"));

  app.use('/', router)

app.listen(PORT, () => console.log(`Server Running at ${PORT}`));
