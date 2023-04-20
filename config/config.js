require("dotenv").config();
const env = process.env;

const development = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "+09:00", // 한국 표준시 (KST)
  },
};

const production = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "+09:00", // 한국 표준시 (KST)
  },
};

const test = {
  username: env.MYSQL_USERNAME,
  password: env.MYSQL_PASSWORD,
  database: env.MYSQL_DATABASE_TEST,
  host: env.MYSQL_HOST,
  dialect: "mysql",
  dialectOptions: {
    dateStrings: true,
    typeCast: true,
    timezone: "+09:00", // 한국 표준시 (KST)
  },
};

module.exports = { development, production, test };
