//models - это инструмент для получения данных
// const booksOper = require("../../models/books");
//импортируем Модел работы с БД
const { Book } = require("../../models/books");
const { HttpError } = require("../../helpers");
// const { addSchema } = require("../../schemas/books");
// const { validateBody } = require("../../middlewares");

const updateById = async (req, res) => {
  const { id } = req.params;
  console.log(req.params, "req.params");
  // findByIdAndUpdate(id, req.body, {new: true}) - обновление по Id - "PUT". 3-й аргумент передается для того, чтобы в ответе был возврещен уже Обновленный объект
  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

// const updateById = async (req, res, next) => {
//   const { id } = req.params;
//   console.log(req.params, "req.params");
//   const result = await booksOper.updateById(id, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(201).json(result);
// };

//WOS
// const updateById = async (req, res, next) => {
//   console.log(req.body, "req.body");
//   // try {
//   // мы используем validateBody middleware
//   // const { error } = addSchema.validate(req.body);
//   // if (error) {
//   //   throw HttpError(400, error.message);
//   // }
//   const { id } = req.params;
//   console.log(req.params, "req.params");
//   const result = await booksOper.updateById(id, req.body);
//   if (!result) {
//     throw HttpError(404, "Not found");
//   }
//   res.status(201).json(result);
//   // } catch (error) {
//   //   next(error);
//   // }
// };

module.exports = updateById;
