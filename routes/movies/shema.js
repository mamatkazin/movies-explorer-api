const { celebrate, Joi } = require('celebrate');

module.exports.validatorCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi
      .string()
      .required()
      .trim(),
    director: Joi
      .string()
      .required()
      .trim(),
    duration: Joi
      .number()
      .required(),
    year: Joi
      .string()
      .required()
      .trim(),
    description: Joi
      .string()
      .required()
      .trim(),
    image: Joi
      .string()
      .required()
      .trim()
      .regex(/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    trailer: Joi
      .string()
      .required()
      .trim()
      .regex(/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    thumbnail: Joi
      .string()
      .required()
      .trim()
      .regex(/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
    movieId: Joi
      .string()
      .required()
      .hex()
      .length(24),
    nameRU: Joi
      .string()
      .required()
      .trim(),
    nameEN: Joi
      .string()
      .required()
      .trim(),
  }),
});

module.exports.validatorMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi
      .string()
      .required()
      .hex()
      .length(24),
  }),
});
