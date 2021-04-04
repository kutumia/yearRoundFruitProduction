require("dotenv").config();
module.exports = {
  HOST: "localhost",
  USER: process.env.UNAME,
  PASSWORD: process.env.PASSWORD,
  DB: "yearroundfruit",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
};
