const express = require("express");
const path = require("path");
const { HttpError } = require("../../helpers");
// console.log(HttpErrors, "H--------");
const booksOper = require("../../models/books");
// const pathToBooks = path.join(
//   __dirname,
//   "..",
//   "..",
//   "models",
//   "books",
//   "books.json"
// );
// console.log(pathToBooks);
const router = express.Router();
// const books = require(pathToBooks);
// console.log(books);
// callback function has name - controller
router.get("/", async (req, res, next) => {
  try {
    // Контроллером называется ф-ция, которая выполняется во время запроса - последняя, которая выполняет задание
    const result = await booksOper.getAll();
    res.json(result);
  } catch (e) {
    res.status(500).json({
      code: 500,
      message: "Server Error",
    });
  }
});
// динамические части маршрута сохраняются в req.params
router.get("/:id", async (req, res, next) => {
  try {
    // console.log(req.params);
    const { id } = req.params;
    const result = await booksOper.getById(id);
    // по методологии REST-Api если чего-то нет, то это 404 ошибка
    if (!result) {
      // use HELPERS
      // console.log(HttpErrors(404, "Not found"));
      throw HttpError(404, "Not found");
      // const error = new Error("Not found");
      // error.status = 404;
      // throw error;
      // return res.status(404).json({
      //   message: "Not found",
      // });
    }
    res.json(result);
  } catch (error) {
    // передаем ошибку дальше - в обработчик ошибок. Если в next передать ошибку ОН будет искать ф-цию обработчик с 4 !!! аргументами - у нас такая ф-ия в файле app в самом конце
    next(error);
    // const { status = 500, message = "Server Error" } = error;
    // res.status(status).json({
    //   message,
    // });
    // req.status(500).json({
    //   message: "Server error",
    // });
  }
});

router.post("/", async (req, res, next) => {
  try {
    console.log(req.body);
    const result = await booksOper.add(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", (req, res) => {
  res.json(books);
});

router.delete("/:id", (req, res) => {
  res.json(books);
});

module.exports = router;
