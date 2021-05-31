const { celebrate, Joi } = require('celebrate');

module.exports.validatorCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .trim()
      .min(2)
      .max(30),
    email: Joi
      .string()
      .required()
      .trim()
      .email(),
    password: Joi
      .string()
      .required()
      .trim()
      .min(6),
  }),
});

module.exports.validatorLogin = celebrate({
  body: Joi.object().keys({
    email: Joi
      .string()
      .required()
      .trim()
      .email(),
    password: Joi
      .string()
      .required()
      .trim()
      .min(6),
  }),
});
