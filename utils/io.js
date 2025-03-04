const { disconnect } = require("mongoose");

const userController = require('../controllers/user.controller');
const user = require("../Models/user");



module.exports = function (io) {  
    //듣기
    io.on('connection', async(socket) => {
        console.log('user connected', socket.id);
    
        socket.on(disconnect, () => {
            console.log('user disconnected', socket.id);
        });      

        socket.on('login', async(userName, cb) => {
            
            console.log('backEnd :', userName);
           
            try{
                const user = await userController.saveUser(userName, socket.id);
                cb({ok: true, data:user});
            }catch(err){
                cb({ok: false, error: err.message});
            } 
             
        });
    });            
    
};

 


