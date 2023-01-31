//models - это инструмент для получения данных
const booksOper = require("../../models/books");
const { HttpError } = require("../../helpers");
// const { addSchema } = require("../../schemas/books");
// const { validateBody } = require("../../middlewares");

const updateById = async (req, res, next) => {
  console.log(req.body, "req.body");
  // try {
  // мы используем validateBody middleware
  // const { error } = addSchema.validate(req.body);
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const { id } = req.params;
  console.log(req.params, "req.params");
  const result = await booksOper.updateById(id, req.body);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = updateById;
