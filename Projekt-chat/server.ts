import { Socket, SocketOptions} from "dgram";


const path = require('path');
const express = require('express')
const http= require('http');
import socketIO from 'socket.io'

const app = express();
const server = http.createServer(app);
const io = new socketIO.Server(server)



//set static folder to acces front
app.use(express.static(path.join(__dirname, 'public')));

//Run when the client connect
io.on('connection', (socket:socketIO.Socket) => {
    console.log("new connection..")
    socket.emit('message', 'Welcome to chatCord!')
   

    // if single client connect server, send to the rest of users message
    
    socket.broadcast.emit('message', 'User has joined to the chat')

    //run when client disconnects
    socket.on('disconnect',()=>{
        io.emit('message','User has left the chat')
    })
})

const PORT = 3005 || process.env.PORT;

server.listen(PORT, () => console.log(`Server runing on port ${PORT}`) );