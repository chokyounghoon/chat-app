const { disconnect } = require("mongoose");


module.exports = function (io) {  
    //듣기
    io.on('connection', async(socket) => {
        console.log('user connected', socket.id);
    
        socket.on(disconnect, () => {
            console.log('user disconnected', socket.id);
        });    
  });            

};

 


