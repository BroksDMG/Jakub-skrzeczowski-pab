import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import socketIO from 'socket.io'
import {getUsers, userJoin, userLeave} from './util/user'


const app = express();

const server = http.createServer(app);

const io = new Server(server,{cors:{origin:"http://localhost:3000"}});





io.on("connection",(socket)=>{
    socket.join ("myChat");

    socket.on("handle-connection", (username:string)=>{
        if(!userJoin(socket.id, username)){
            socket.emit("username-taken")
        }else{
            socket.emit("username-submitted-successfully");
            io.to("myChat").emit("get-connected-users",getUsers());
        }

    });
    console.log("clien connected")
    socket.on("disconnect",()=>{
        userLeave(socket.id);
    })
})

server.listen(5001, ()=> console.log("server listen on port 5001."))

// //set static folder to acces front
// app.use(express.static(path.join(__dirname, 'public')));

// //Run when the client connect
// io.on('connection', (socket:socketIO.Socket) => {
//     console.log("new connection..")
//     socket.emit('message', 'Welcome to chatCord!')
   

//     // if single client connect server, send to the rest of users message
    
//     socket.broadcast.emit('message', 'User has joined to the chat')

//     //run when client disconnects
//     socket.on('disconnect',()=>{
//         io.emit('message','User has left the chat')
//     })
// })

// const PORT = 3005 || process.env.PORT;

// server.listen(PORT, () => console.log(`Server runing on port ${PORT}`) );