const express = require("express");
const Joi = require("joi");
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
const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
});
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
    // console.log(req.body);
    const { error } = addSchema.validate(req.body);
    // console.log(error, "Joi validate");
    if (error) {
      throw HttpError(400, error.message);
    }
    const result = await booksOper.add(req.body);
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.put("/:id", async (req, res, next) => {
  console.log(req.body, "req.body");
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const { id } = req.params;
    console.log(req.params, "req.params");
    const result = await booksOper.updateById(id, req.body);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    res.status(201).json(result);
  } catch (error) {
    next(error);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const result = await booksOper.removeById(id);
    if (!result) {
      throw HttpError(404, "Not found");
    }
    // res.status(204); //message does not send
    res.json({
      message: "Delete Success",
    });
  } catch (error) {
    next(error);
  }
});

module.exports = router;
