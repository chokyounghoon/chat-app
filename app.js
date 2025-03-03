const express = require("express"); //express 모듈을 가져옴
const app = express(); //express를 실행하여 app에 할당
const mongoose = require("mongoose"); //mongoose 모듈을 가져옴

const cors = require("cors"); //cors 모듈을 가져옴
app.use(cors());//어떠한 도메인에서도 접근 가능하게 함
require("dotenv").config(); //dotenv 모듈을 가져옴



mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  });

module.exports = app;

