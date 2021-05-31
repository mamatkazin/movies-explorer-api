module.exports.configDB = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports.configCors = {
  credentials: true,
  origin: true,
};

module.exports.configRateLimit = {
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
};

module.exports.configExpress = { extended: true };
