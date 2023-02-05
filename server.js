const mongoose = require("mongoose");
require("dotenv").config();
const { PORT = 3000, DB_HOST } = process.env;
const { app } = require("./app");
mongoose.set("strictQuery", true);
mongoose
  .connect(DB_HOST)
  .then(() => app.listen(PORT))
  .catch((error) => {
    console.log(error.message);
    process.exit(1); //закрываем все процессы с кодом ошибки 1
  });
// схема данных - что мы можем добавлять в БД. Это описание объекта, который должен содержаться в отдельной коллекции. Модель - объект, связанный с коллекцией. Напр, метод find - этот метод только для конкретной коллекции. Модель подключается к определенной коллекции и ... работаем.
//Раньше в папке models/books - у нас были функции по работе с json, а теперь МОДЕЛИ по работе/запросам в БД
