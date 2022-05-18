import React, { useEffect ,useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import io from "socket.io-client";
import { StringLiteralLike } from 'typescript';
import ConnectedUsers from './components/connectedUsers/ConecctedUsers';
import EnterUsername from './components/EnterUsername';
import Messages from './components/messages/Messages';

function App() {
  const [connected,setConnected]= useState(false);
  const [username, setUsername]= useState("");
  const [connectedUsers, setConnectedUsers] = useState([] as {id: string, username: string}[]);
  const [messages,setMessages]= useState([] as {message:string;username:string;}[])
  const [message, setMessage]= useState("")

  const socketClient = useRef<SocketIOClient.Socket>();
useEffect(()=>{
  socketClient.current = io.connect("http://localhost:5002");

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
    socketClient.current.on("receive-message", (message:{message:string;username:string;})=>{
      setMessages((prev =>[...prev,message]))
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
  const handleSendMessage=()=>{
    if(socketClient.current){
      socketClient.current.emit("message", {message, username});
      setMessage("")
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

    <Messages 
    handleSendMessage={handleSendMessage} 
    message={message} 
    setMessage={setMessage} 
    messages={messages}
    username={username}
    />
    </>
  }
    <ToastContainer position="bottom-right"/>
  </div>
  );
}

export default App;
