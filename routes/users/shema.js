const { celebrate, Joi } = require('celebrate');

module.exports.validatorUser = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .trim()
      .min(2)
      .max(30),
    email: Joi.string().required().trim().email(),
  }),
});
