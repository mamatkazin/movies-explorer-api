const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
// const { errors } = require('celebrate');
const cors = require('cors');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');

dotenv.config();

const { router } = require('./routes');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { parseError } = require('./services/error');
const {
  configDB, configCors, configRateLimit, configExpress,
} = require('./services/config');
const { PATH_DB_DEV, PORT_DEV } = require('./services/const');

const { PORT = PORT_DEV } = process.env;
const { PATH_DB = PATH_DB_DEV } = process.env;

const app = express();

// подключаемся к серверу mongo
mongoose.connect(PATH_DB, configDB);

app.use(cors(configCors));

app.use(express.json());
app.use(express.urlencoded(configExpress));

app.use(helmet());
app.use(rateLimit(configRateLimit));

app.use(requestLogger);

router(app);

app.use(errorLogger);

// app.use(errors());
app.use(parseError);

app.listen(PORT);
