var config = {};

config.sql = {};

config.sql.credentials = {
    host: "localhost",
    user: "root",
    password: "",
    database: "dankotuwa"
  };

config.jwt = {secret: "", 
              audience: ""};

config.twilio = {secret: "",
                 token: "",
                 number: ""};

module.exports = config;
