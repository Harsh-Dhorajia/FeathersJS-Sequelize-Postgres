require("dotenv").config();

const POSTGRES = {
  HOST: process.env.POSTGRES_HOST || "localhost",
  USERNAME: process.env.POSTGRES_USERNAME || "postgres",
  PASSWORD: process.env.POSTGRES_PASSWORD || "postgres",
  DB: process.env.POSTGRES_DATABASE || "sample",
  PORT: process.env.POSTGRES_PORT || 5432,
  DIALECT: "postgres",
};

const Constants = {
  POSTGRES,
};

module.exports = Constants;
