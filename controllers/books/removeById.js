//models - это инструмент для получения данных
const booksOper = require("../../models/books");
const { HttpError } = require("../../helpers");

const removeById = async (req, res, next) => {
  //   try {
  const { id } = req.params;
  const result = await booksOper.removeById(id);
  if (!result) {
    throw HttpError(404, "Not found");
  }
  // res.status(204); //message does not send
  res.json({
    message: "Delete Success",
  });
  //   } catch (error) {
  //     next(error);
  //   }
};

module.exports = removeById;
