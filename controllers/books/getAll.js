const path = require("path");
//models - это инструмент для получения данных
// const booksOper = require("../../models/books");
//импортируем Модел работы с БД
const { Book } = require("../../models/books");

const getAll = async (req, res, next) => {
  // const result = await booksOper.getAll();
  const result = await Book
    .find
    // {
    //   author: "Caitlin Sadowski, Thomas Zimmermann",
    // },
    // "title author"
    (); // вызываю готовый инструмент у mongoose
  // Этот метод без параметров возвращает все объекты - всегда массив, а если передать, то по переданным условиям - как точное равентство. Или другие сложные условия Вторым аргументом передаю поля, которые хочу получить - "поле1 поле2 поле3" - название через пробел. Получить все, НО кроме "p_id -поле1 -поле2". Mongoose Docs Queries
  res.json(result);
};

//WOS
// const getAll = async (req, res, next) => {
//   // Мы используем контроллер-обертку - обработчик ошибок
//   //   try {
//   // Контроллером называется ф-ция, которая выполняется во время запроса - последняя, которая выполняет задание
//   const result = await booksOper.getAll();
//   res.json(result);
//   //   } catch (e) {
//   // res.status(500).json({
//   //   code: 500,
//   //   message: "Server Error",
//   // });
//   //   }
// };

module.exports = getAll;
