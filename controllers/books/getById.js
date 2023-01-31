const booksOper = require("../../models/books");
const { HttpError } = require("../../helpers");
const getById = async (req, res, next) => {
  // try {
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
  // } catch (error) {
  // передаем ошибку дальше - в обработчик ошибок. Если в next передать ошибку ОН будет искать ф-цию обработчик с 4 !!! аргументами - у нас такая ф-ия в файле app в самом конце
  // next(error);
  // const { status = 500, message = "Server Error" } = error;
  // res.status(status).json({
  //   message,
  // });
  // req.status(500).json({
  //   message: "Server error",
  // });
  // }
};

module.exports = getById;
