1.백앤드설정
    - DB설정, 웹소켓설정, 

2.프론트엔드설정
    - 웹소켓설정

3.백엔드 프로튼엔드 연결테스트

4.유저로그인

5.메세지 주고받기


1.mpm 시작
(base) khcho@jokers-iMac chatapp-be-student % npm init -y
Wrote to /Users/khcho/workspace/chatapp-be-student/package.json:

{
  "name": "chatapp-be-student",
  "version": "1.0.0",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": ""
}



2.설치포르그램
(base) khcho@jokers-iMac chatapp-be-student % npm i express, mongoose, cors dotenvv http;  

express: 서버
mongoose : 몽고DB라이브러리
cors : 백엔드 프론트 연결 수월 하게 함
dotenv : 설치한 환경변수 가져올 라이브러리
http: http서버, 웹소켓 올릴용
