const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { INVALID_FIELD } = require('../../services/const');

module.exports.validatorCreateMovie = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required().trim(),
    director: Joi.string().required().trim(),
    duration: Joi.number().required(),
    year: Joi.string().required().trim(),
    description: Joi.string().required().trim(),
    image: Joi.string()
      .required()
      .trim()
      .regex(
        /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
      ),
    // .custom((value, helpers) => {
    //   if (validator.isURL(value)) {
    //     return value;
    //   }

    //   return helpers.message(INVALID_FIELD);
    // }),
    trailer: Joi.string()
      .required()
      .trim()
      // .regex(/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
      .custom((value, helpers) => {
        if (validator.isURL(value)) {
          return value;
        }

        return helpers.message(INVALID_FIELD);
      }),
    thumbnail: Joi.string()
      .required()
      .trim()
      .regex(
        /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/
      ),
    // .custom((value, helpers) => {
    //   if (validator.isURL(value)) {
    //     return value;
    //   }

    //   return helpers.message(INVALID_FIELD);
    // }),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required().trim(),
    nameEN: Joi.string().required().trim(),
  }),
});

module.exports.validatorMovieId = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().required().hex().length(24),
  }),
});
