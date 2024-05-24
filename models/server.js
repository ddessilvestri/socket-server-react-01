
const express = require('express'); //Express server
const http = require('http'); // Sockets Server
const scoketio = require('socket.io');
const path = require('path');
const Sockets = require('./sockets');
const cors = require('cors');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer(this.app);
        //Socket configuration
        this.io = scoketio(this.server,{ /* configutations */ });
    }

    middlewares(){
        this.app.use(express.static( path.resolve(__dirname, '../public')));

        //CORS
        this.app.use(cors());
        
    }

    configureSockets(){
        new Sockets(this.io);
    }

    execute(){
        // initialize middlewares
        this.middlewares();
        // initialize sockets
        this.configureSockets();
        // initialize server
        this.server.listen(this.port, () => {
            console.log('Server running in Port:',this.port);
        })
    }
}

module.exports = Server;