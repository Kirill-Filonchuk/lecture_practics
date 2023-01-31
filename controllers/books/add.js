//models - это инструмент для получения данных
const booksOper = require("../../models/books");
// const { HttpError } = require("../../helpers");
// const { addSchema } = require("../../schemas/books");

const add = async (req, res, next) => {
  // try {
  // console.log(req.body);
  //We use middleware validate controller
  // const { error } = addSchema.validate(req.body);
  // // console.log(error, "Joi validate");
  // if (error) {
  //   throw HttpError(400, error.message);
  // }
  const result = await booksOper.add(req.body);
  res.status(201).json(result);
  // } catch (error) {
  //   next(error);
  // }
};

module.exports = add;
