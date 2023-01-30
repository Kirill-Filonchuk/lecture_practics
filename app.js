const express = require("express");
const cors = require("cors");
const logger = require("morgan");
require("dotenv").config();
const { PORT } = process.env;
const booksRouters = require("./routes/api/books");
// console.log(booksRouters);
const app = express();
app.use(cors());
app.use(logger("tiny"));
app.use(express.json()); // Смотрит, есть ли тело запроса
app.use("/api/books", booksRouters); //this middleware exequit only on router that begin on point path
app.use((err, req, res, next) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = {
  app,
  PORT,
};
// app.listen(PORT);

//////////////------- les 5---------/////////////////////////////
// const mongoose = require("mongoose");
// require("dotenv").config();
// const { DB_HOST } = process.env;
// // books_reader - basa, books - collection - array of objects
// // console.log(process.env);
// mongoose.set("strictQuery", true);
// mongoose
//   .connect(DB_HOST)
//   .then(() => console.log("database connect success"))
//   .catch((error) => console.log(error.message));
