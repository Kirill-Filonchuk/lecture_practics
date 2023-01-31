//Эта ф-я получает ф-цию контроллер, как аргумент. В середине она создает другую ф-цию - ф-цию, оболочку для ф-йии контроллер
const ctrlWrapper = (ctrl) => {
  const func = async (req, res, next) => {
    try {
      await ctrl(req, res, next);
    } catch (error) {
      next(error);
    }
  };
  return func;
};

module.exports = ctrlWrapper;
