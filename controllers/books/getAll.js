const path = require("path");
//models - это инструмент для получения данных
const booksOper = require("../../models/books");
const getAll = async (req, res, next) => {
  // Мы используем контроллер-обертку - обработчик ошибок
  //   try {
  // Контроллером называется ф-ция, которая выполняется во время запроса - последняя, которая выполняет задание
  const result = await booksOper.getAll();
  res.json(result);
  //   } catch (e) {
  // res.status(500).json({
  //   code: 500,
  //   message: "Server Error",
  // });
  //   }
};

module.exports = getAll;
