import React, { useEffect ,useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import io from "socket.io-client";
import ConnectedUsers from './components/connectedUsers/ConecctedUsers';
import EnterUsername from './components/EnterUsername';

function App() {
  const [connected,setConnected]= useState(false);
  const [username, setUsername]= useState("");
  const [connectedUsers, setConnectedUsers] = useState([] as {id: string, username: string}[]);

  const socketClient = useRef<SocketIOClient.Socket>();
useEffect(()=>{
  socketClient.current = io.connect("http://localhost:5001");

  if(socketClient.current){
    socketClient.current.on("username-submitted-successfully",()=>{
      setConnected(true);
    
    })

    socketClient.current.on("username-taken",()=>{
      toast.error("Username is taken")
    })

    socketClient.current.on("get-connected-users", (connectedUsers:{id:string; username:string;}[])=>{
      setConnectedUsers(connectedUsers.filter(user=>user.username!==username));
      console.log(connectedUsers)
    })

  }
  return () => {
    socketClient.current?.disconnect();
    socketClient.current = undefined;
  };
  

}, [username])

  const handleConnection = ()=>{
    if(socketClient.current){
      socketClient.current.emit("handle-connection",username)
    }
  } 
  return (
    <div className="app">
     {
       !connected &&
       <EnterUsername handleConnection={handleConnection} username={username} setUsername={setUsername}/>
      
       
     }
  {
    connected&&
    <>
    
    <ConnectedUsers connectedUsers={connectedUsers} />
    </>
  }
    <ToastContainer position="bottom-right"/>
  </div>
  );
}

export default App;
