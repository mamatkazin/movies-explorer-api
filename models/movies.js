const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
  country: {
    type: String,
    required: true,
    trim: true,
  },
  director: {
    type: String,
    required: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  year: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator(val) {
        return /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g.test(
          val,
        );
      },
      message: '{VALUE} is not a valid url',
    },
  },
  trailer: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator(val) {
        return /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g.test(
          val,
        );
      },
      message: '{VALUE} is not a valid url',
    },
  },
  thumbnail: {
    type: String,
    required: true,
    trim: true,
    validate: {
      validator(val) {
        return /^(http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-/]))?/g.test(
          val,
        );
      },
      message: '{VALUE} is not a valid url',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    required: true,
  },
  movieId: {
    type: Number,
    required: true,
  },
  nameRU: {
    type: String,
    required: true,
    trim: true,
  },
  nameEN: {
    type: String,
    required: true,
    trim: true,
  },
});

module.exports = mongoose.model('movie', movieSchema);
