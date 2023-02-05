const express = require("express");
//ctrl - контроллеры это функции, которые исполняются во время запроса
const ctrl = require("../../controllers/books");

const { ctrlWrapper } = require("../../helpers");
const { validateBody, isValidId } = require("../../middlewares");
const { schemas } = require("../../models/books");
const router = express.Router();
/*
  const getAllCtrl=ctrlWrapper(ctrl.getAll);
  const getAllCtrl=async(req, res,next)=>{
  try{
  await ctrl.getAll(req, res,next)
  } catch(error){
  next(erro)
  }
  };
  router.get('/', ctrlWrapper(ctrl.getAll))
  */
// callback function has name - controller
router.get("/", ctrlWrapper(ctrl.getAll));
// динамические части маршрута сохраняются в req.params
router.get("/:id", isValidId, ctrlWrapper(ctrl.getById));
//validateBody(schemas.addSchema), мы вначале проверяем тело запроса и если все Ок, next() передает запрос дальше ctrlWrapper, где обрабатываем запрос, а если ошибка, то она сразу перепрыгивает в app.use(err, ....) - обработчик ошибок
router.post("/", validateBody(schemas.addSchema), ctrlWrapper(ctrl.add));
//последние функции называются функции-контроллеры, а промежуточные - миддлвары
// router.put("/:id", isValidId, ctrlWrapper(ctrl.updateById)); - Обновляет поле ПОЛНОСТЬЮ, поэтому создадим маршрут для ЧАСТИЧНОГО обновления - путем передачи только обновляемого поля - Это "PATCH"
router.put("/:id", isValidId, ctrlWrapper(ctrl.updateById));
router.patch(
  "/:id/favorite",
  isValidId,
  validateBody(schemas.updateFavoriteSchema),
  ctrlWrapper(ctrl.updateFavorite)
);
router.delete("/:id", isValidId, ctrlWrapper(ctrl.removeById));

module.exports = router;
