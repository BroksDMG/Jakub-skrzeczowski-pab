import io, { Socket } from "socket.io-client";

const chatForm = document.getElementById('chat-form');
const socket:Socket = io();

socket.on('message', message=>{
    console.log(message);
});

//Mesage submit 
chatForm.addEventListener('submit', (e)=>{
    e.preventDefault();

    
})