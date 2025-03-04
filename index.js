const {createServer} = require('http');
const app = require('./app');
const {Server} = require('socket.io');
require('dotenv').config();

const httpserver = createServer(app);

const io = new Server(httpserver, {

    cors: {
        origin: 'http://localhost:3000',
    }
});

require('./utils/io')(io);

httpserver.listen(process.env.PORT, () => { 
    console.log(`Server is running on port ${process.env.PORT}`);
}
);  
 