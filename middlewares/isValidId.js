const { isValidObjectId } = require("mongoose"); // это функция монгуса, которая проверяет может ли это быть теоретически Id

const { HttpError } = require("../helpers");

const isValidId = (req, res, next) => {
  const { id } = req.params;
  if (!isValidObjectId(id)) {
    console.log(isValidObjectId(id), "isValidObjectId(id)");
    next(HttpError(404, "Invalid Id"));
  }
  next();
};

module.exports = isValidId;
