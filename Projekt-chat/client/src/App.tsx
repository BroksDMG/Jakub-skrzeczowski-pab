import React, { useEffect ,useRef, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import io from "socket.io-client";
import { StringLiteralLike } from 'typescript';
import ConnectedUsers from './components/connectedUsers/ConecctedUsers';
import EnterUsername from './components/EnterUsername';
import Messages from './components/messages/Messages';

function App() {
  // zadeklarowanie nowych zmiennych stanu "hooki"
  const [connected,setConnected]= useState(false);
  const [username, setUsername]= useState("");
  const [connectedUsers, setConnectedUsers] = useState([] as {id: string, username: string}[]);
  const [messages,setMessages]= useState([] as {message:string;username:string;}[])
  const [message, setMessage]= useState("")
  //"pudełko" do przechowywania wartość w swojej właściwości current
  const socketClient = useRef<SocketIOClient.Socket>();
  //hook efektów pozwala na przeprowadzenie efektów ubocznych w komponencie App
  //pobiera dane z servera i aktualizuje przy każdym renderze
useEffect(()=>{
  //łączy z serverem na localhost:5000
  socketClient.current = io.connect("http://localhost:5004");
  
  if(socketClient.current){
    //jeżeli sie połączył zmienai setconnected na true
    socketClient.current.on("username-submitted-successfully",()=>{
      setConnected(true);
    //console.log("jeden dołączył") => consola jak połączy z czatem
    })
    // wyświetla wiadomość jak nick jest zajęty
    socketClient.current.on("username-taken",()=>{
      // toast.error(" sprawdzam")=>przed połączeniem z czatem komunikat
      toast.error("Username is taken")
    })
    //wyświetla połączonych użytkowników w konsoli w tablicy
    socketClient.current.on("get-connected-users", (connectedUsers:{id:string; username:string;}[])=>{
      
      setConnectedUsers(connectedUsers.filter(user=>user.username!==username));
       console.log(connectedUsers)
    
    })
    //wiadomości otrzymywane
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
    console.log("Welcome to myChat")
    if(socketClient.current){
      socketClient.current.emit("handle-connection",username)
    }
  } 
  //wysyłane i otrzymywane wiadomoście na czacie 
  const handleSendMessage=()=>{
    if(socketClient.current){
      setMessages(prev=>[...prev,{message,username}])
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
