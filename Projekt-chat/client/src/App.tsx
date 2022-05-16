import React, { useEffect ,useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import EnterUsername from './components/EnterUsername';
import io from "socket.io-client";

function App() {
  const [connected,setConnected]= useState(false);
  const [username, setUsername]= useState("");
  const [connectedUsers,setConnectedUsers]= useState([] as {id:string; username:string;}[] )

  const socketClient = useRef<SocketIOClient.Socket>();
useEffect(()=>{
  socketClient.current = io.connect("http://localhost:5000");

  if(socketClient.current){
    socketClient.current.on("username-taken",()=>{
      toast.error("Username is taken")
    })

    socketClient.current.on("username-submitted-successfully",()=>{
      setConnected(true);
    })

    socketClient.current.on("get-connected-users", (connectedUsers:{id:string; username:string;}[])=>{
      console.log(connectedUsers)
      setConnectedUsers(connectedUsers.filter(user=>user.username!==username));
    })

  }

}, [])
  const handleConnection = ()=>{
    if(socketClient.current){
      socketClient.current.emit("handle-connection",username)
    }
  } 
  return (
    <div className="app">
     {
       !connected &&
       <EnterUsername username={username} setUsername={setUsername} handleConnection={handleConnection}/>
       
       
     }
    </div>
  );
  {
    connected&&
    <div>Connected</div>
  }
}
<ToastContainer position="bottom-right"/>

export default App;
