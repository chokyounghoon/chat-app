const express = require("express"); //express 모듈을 가져옴
const app = express(); //express를 실행하여 app에 할당
const mongoose = require("mongoose"); //mongoose 모듈을 가져옴
const cors = require("cors"); //cors 모듈을 가져옴

app.use(cors());//어떠한 도메인에서도 접근 가능하게 함
require("dotenv").config(); //dotenv 모듈을 가져옴

const Room = require("./Models/room");

//  임의로 룸을 만들어주기
app.get("/", async (req, res) => {

  Room.insertMany([
    { 
      room: "자바스크립트 단톡방",
      members: [], 
    }, 
    {
      room: "리액트 단톡방",
      members: [],
    },
    {
      room: "NodeJS 단톡방",
      members: [],
    },
  ])
    .then(() => res.send("ok"))
    .catch((error) => res.send(error));
});


mongoose
  .connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Failed to connect to MongoDB", err);
  }); 

module.exports = app;

