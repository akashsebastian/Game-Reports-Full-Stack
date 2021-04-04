module.exports = {
    HOST: "database-cloud.cesoyytcmiho.ap-southeast-1.rds.amazonaws.com",
    USER: "postgres",
    PASSWORD: "Jasmine#4044",
    DB: "filmroomanalyticsdb",
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };