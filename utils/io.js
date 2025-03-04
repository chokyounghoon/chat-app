const { disconnect } = require("mongoose");

const userController = require('../controllers/user.controller');

const chatController = require("../controllers/chat.controller");
const roomController = require("../controllers/room.controller");


const user = require("../Models/user");

module.exports = function (io) {  
    //듣기sss
    io.on('connection', async(socket) => {
        console.log('user connected', socket.id);
        socket.emit("rooms", await roomController.getAllRooms()); // 룸 리스트 보내기
    
        socket.on('disconnect', () => {
            console.log('user disconnected', socket.id);
        });     
         
        socket.on("joinRoom", async (rid, cb) => {
            try {
              const user = await userController.checkUser(socket.id); // 일단 유저정보들고오기
          
              await roomController.joinRoom(rid, user); // 1~2작업
              socket.join(user.room.toString());//3 작업
              const welcomeMessage = {
                chat: `${user.name} is joined to this room`,
                user: { id: null, name: "system" },
              };

              io.to(user.room.toString()).emit("message", welcomeMessage);// 4 작업
              io.emit("rooms", await roomController.getAllRooms());// 5 작업
              
              cb({ ok: true });
            } catch (error) {
              cb({ ok: false, error: error.message });
            }
        });
        socket.on('login', async(userName, cb) => {
            
            console.log('backEnd :', userName);
           
            try{
                const user = await userController.saveUser(userName, socket.id);
               
                /*
                const WelcomeMessage = {
                  //화면출력구문 문구

                  chat: `${user.name} 님이 입장하셨습니다.`,
                  user: {
                    id: null,
                    name: "system"
                  }
                };
                io.emit('chat', WelcomeMessage);
                */
                cb({ok: true, data:user});
            }catch(err){
                cb({ok: false, error: err.message});
            } 
             
        });
        socket.on("sendMessage", async (receivedMessage, cb) => {
            try {
              const user = await userController.checkUser(socket.id);
              if (user) {
                const message = await chatController.saveChat(receivedMessage, user);
                io.to(user.room.toString()).emit("message", message); // 이부분을 그냥 emit에서 .to().emit() 으로 수정
                return cb({ ok: true });
              }
            } catch (error) {
              cb({ ok: false, error: error.message });
            }
          });
        
          socket.on("leaveRoom", async (_, cb) => {
            try {
              const user = await userController.checkUser(socket.id);
              await roomController.leaveRoom(user);
              const leaveMessage = {
                chat: `${user.name} left this room`,
                user: { id: null, name: "system" },
              };
              socket.broadcast.to(user.room.toString()).emit("message", leaveMessage); // socket.broadcast의 경우 io.to()와 달리,나를 제외한 채팅방에 모든 맴버에게 메세지를 보낸다 
              io.emit("rooms", await roomController.getAllRooms());
              socket.leave(user.room.toString()); // join했던 방을 떠남 
              cb({ ok: true });
            } catch (error) {
              cb({ ok: false, message: error.message });
            }
          });

          socket.on('chat', async(message, cb) => {
            try{

                console.log('io message :', message);
                //user 정보 가져오기
                const user = await userController.checkUser(socket.id);
                //메시지 저장
                const newMessage = await chatController.saveChat(user, message);
                io.emit('chat', newMessage);
    
                cb({ok: true});

            }
            catch(err){
                console.error(err);
                cb({ok: false, error: err.message});
                return;
            }
        
        });
    });            
    
};

 


