// Для работы с одной конкретной коллекцией
// 1. Schema
// 2. Model
const { Schema, model } = require("mongoose");
const { handleMongooseError } = require("../helpers");
// JOI проверяет то, что приходит, а Schema -
const Joi = require("joi");

const genre = ["fantastic", "love"];
const isbnRegexp = /^\d{3}-\d{3}-\d-\d{5}-\d$/;
// JOI проверяет то, что приходит, а Schema -
// проверяет то, что мы сохраняем в БД
const bookSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    genre: {
      type: String,
      enum: genre, // передается массив возможных значений
      required: true,
    },
    // ISBN - 123-456-7-89012-3
    isbn: {
      type: String,
      match: isbnRegexp, //валидация строки
      unique: true, //уникальный элемент в коллекции! ТОлько в пустой БД и проверьть и настроить после первого добавленного элемента
      required: true,
    },
  },
  {
    versionKey: false, //_v
    // schema_version: { type: Number, default: 1 },
    // schema_version: "2",
    timestamps: true,
  }
);

const addSchema = Joi.object({
  title: Joi.string().required(),
  author: Joi.string().required(),
  favorite: Joi.boolean(),
  genre: Joi.string()
    .valid(...genre)
    .required(),
  isbn: Joi.string().pattern(isbnRegexp).required(),
});

const updateFavoriteSchema = Joi.object({
  favorite: Joi.boolean().required(),
});

const schemas = {
  addSchema,
  updateFavoriteSchema,
};
// при добавлении объекта с неправильными полями - наше приложениие непрвильно выдет код ошибки, оно его не получает. Для настройки необходимо добавить мидлвару для Схемы
bookSchema.post("save", handleMongooseError); // save метод сохранения в mongoose
// по документации название коллекции передается в Единственном числе - book, хотя у нас эта коллекция в БД - books
const Book = model("book", bookSchema); // модель Book по работе с коллекцией book по схеме bookSchema
// каждая Модель содержит в себе все необходимые инстременты по работе с коллекцией
module.exports = { Book, schemas };
