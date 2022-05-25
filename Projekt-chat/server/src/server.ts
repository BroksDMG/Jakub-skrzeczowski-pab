import express from 'express';
import http from 'http';
import {Server} from 'socket.io';
import socketIO from 'socket.io'
import {getUsers, userJoin, userLeave} from './util/user'


const app = express();

const server = http.createServer(app);

const io = new Server(server,{cors:{origin:"http://localhost:3000"}});




//Co robi:uruchamia się kiedy klient połączy się z serwerem
//Z czym łączy:  app =>useeffect i przechwytuje io.connection na localhosie:5000
io.on("connection",(socket)=>{
    //co robi: subskrybuje gniazdo do danego kanału w tymn wypdku myChat
    socket.join ("myChat");
    
        // co robi: połączenia przechodzące od kilenta przez giazdo
    socket.on("handle-connection", (username:string)=>{
        //co robi: sprawdza czy jest użytkownik o tym samym id i nazwie, jeżeli jest Username-taken
        if(!userJoin(socket.id, username)){
            socket.emit("username-taken")
        }else{
            //co robi: jeżeli nie ma z tą samą nazwą to sukces, dołącza do myChat i dopisuje do users
            //z czym się łączy: user getUsers
            //  console.log("jeden użytkownik dołączył") =>terminal jak połączy z czatem

            socket.emit("username-submitted-successfully");
            io.to("myChat").emit("get-connected-users",getUsers());
        }

    });
    // do wszystkich użytkowników poza połączonym użytkownikiem
    socket.on("message",(message:{message:string;username:string})=>{
        //co robi: łaczy z myChat i wysyła message receive-message
        socket.broadcast.to("myChat").emit("receive-message", message)
        
    });
    //Cor robi: uruchamia sie kiedy użytkownik rozłącza się z serverem 
    socket.on("disconnect",()=>{
        // io.emit('message', 'A user has left the chat')
        // co robi: metoda usów użtkownika o podanym id
        // łączy sie : user=>userLeave
        userLeave(socket.id);
    })
})
 // słucha na localhoscie:5000
server.listen(5004, ()=> console.log("server listen on port 5004."))

// //set static folder to acces front
// app.use(express.static(path.join(__dirname, 'public')));

// //Run when the client connect
// io.on('connection', (socket:socketIO.Socket) => {
//     console.log("new connection..")
//     socket.emit('message', 'Welcome to chat!')
   

//     // if single client connect server, send to the rest of users message
    
//     socket.broadcast.emit('message', 'User has joined to the chat')

//     //run when client disconnects
//     socket.on('disconnect',()=>{
//         io.emit('message','User has left the chat')
//     })
// })

// const PORT = 3005 || process.env.PORT;

// server.listen(PORT, () => console.log(`Server runing on port ${PORT}`) );
// funkcjonalności:
// 1. wysyłanie swoich wiadomości 
// 2. otrzymywanie wiadomości
// 3. wyświetlanie listy użytkowników
// 4. połączenie sie z kanałem czatu
// 5. sprawdzanie nicków (nie mogą być dwa takie same)
// 6. wyświetlenie nazwy użytkownika w wiadomości wraz z datą dzień/miesiąc/rok i godziną /godz/min/sekunda
// 7. wyróżnienie wiadomości wysyłanych i otrzymywanych na czacie
// 8. wyświetlenie awataru użytkowników
// 9. usuwanie użytkownika wylogowanego z czatu automatycznie