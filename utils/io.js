const { disconnect } = require("mongoose");

const userController = require('../controllers/user.controller');
const user = require("../Models/user");
const chatController = require("../controllers/chat.controller");
const roomController = require("../controllers/room.controller");
 
module.exports = function (io) {  
    //듣기sss
    io.on('connection', async(socket) => {
        console.log('user connected', socket.id);
        socket.emit("rooms", await roomController.getAllRooms()); // 룸 리스트 보내기
    
        socket.on(disconnect, () => {
            console.log('user disconnected', socket.id);
        });      

        socket.on('login', async(userName, cb) => {
            
            console.log('backEnd :', userName);
           
            try{
                const user = await userController.saveUser(userName, socket.id);
                const WelcomeMessage = {
                  //화면출력구문 문구

                  chat: `${user.name} 님이 입장하셨습니다.`,
                  user: {
                    id: null,
                    name: "system"
                  }
                };
                io.emit('chat', WelcomeMessage);

                cb({ok: true, data:user});
            }catch(err){
                cb({ok: false, error: err.message});
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

 


