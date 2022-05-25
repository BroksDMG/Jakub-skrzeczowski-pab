// zaousuje użytkowników w tablicy
let users: {id:string; username:string;}[]=[
    // {id:"e124",username:"rts"},
    
]
// co robi: metod sprawdza czy jest użytkownik o tej samej nazwie, jeżeli jest :false, jeżeli nie Push
//łaczy się: server=> handel-connection
export const userJoin = (id:string, username: string)=> {
    let user = users.find(user=>user.username===username);
    if(user){
        return false;
    }
    users.push({id,username});
    return true;
}
//co robi: Metoda usuwa użytkownika o tym samym id
//łączy sie: sever=> disconnect
export const userLeave = (id:string)=> {
    users= users.filter(user => user.id !==id)
}
//co robi: Metoda dodaje do tablicy users
//łączy się: server => handleconnection =>
export const getUsers = () => users;