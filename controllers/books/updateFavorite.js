const { Book } = require("../../models/books");
const { HttpError } = require("../../helpers");

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  console.log(req.params, "req.params");

  const result = await Book.findByIdAndUpdate(id, req.body, { new: true });
  if (!result) {
    throw HttpError(404, "Not found");
  }
  res.status(201).json(result);
};

module.exports = updateFavorite;
