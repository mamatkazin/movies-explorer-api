const { celebrate, Joi } = require('celebrate');

// module.exports.validatorUserId = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().required().hex().length(24),
//   }),
// });

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

// module.exports.validatorUserAvatar = celebrate({
//   body: Joi.object().keys({
//     avatar: Joi
//       .string()
//       .required()
//       .trim()
//       .regex(/^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/),
//   }),
// });
