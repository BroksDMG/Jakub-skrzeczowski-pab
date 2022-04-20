import express from 'express';
import e, {Request, Response} from 'express';
import { send } from 'process';
import jwt from 'jsonwebtoken';
import fs from "fs";
import { userInfo } from 'os';


 
const app = express()

app.use(express.json())



async function readStorage(): Promise<void> {
    try {
        noteArray = JSON.parse(await fs.promises.readFile("./src/data/note.json", 'utf-8'));
        tagArray = JSON.parse(await fs.promises.readFile("./src/data/tag.json", 'utf-8'));
        userArray = JSON.parse(await fs.promises.readFile("./src/data/user.json", 'utf-8'));
    } catch (err) {
        console.log(err)
    }
  }
  async function updateStorage(): Promise<void> {
    try {
        await fs.promises.writeFile("./src/data/note.json", JSON.stringify(noteArray));
        await fs.promises.writeFile("./src/data/tag.json", JSON.stringify(tagArray));
        await fs.promises.writeFile("./src/data/user.json", JSON.stringify(userArray));
    } catch (err) {
        console.log(err)
    }
  }  
  readStorage()

  app.use((req,res,next)=>{
      const secret= "topSecret"
      const authData=req.headers.authorization
      const token = authData?.split(' ')[1]?? ""
      const paylod = jwt.verify (token ,secret)
        if(paylod !== undefined)next()
  });
export interface Note{
    id?:number
    user:string
    visibility:boolean
    title: string
    content:string
    createDate?:string
    tags?: Tag[]
}
export interface Tag{
    id?:number
    name:string
}
export interface User{
    login:string,
    password:string,
    token:string
}
  let noteArray:Note[]=[]
    let tagArray:Tag[]=[]
    let userArray:User[]=[]


app.post('/api/note',(req,res)=>{  
    const data = new Date().toISOString()
    const id = req.body.id == undefined ? Date.now() : req.body.id
    const newNote: Note={
        id:id,
        title:req.body.title,
        content:req.body.content,
        createDate:data,
        tags:req.body.tags,
        visibility:req.body.visibilitym,
        user:req.body.user

    }
    const noteTagArray=req.body.tags as Tag[]
    noteTagArray.forEach(element => {
        if(!tagArray.find(tagArray=>tagArray.id==id)){
        const id = element.id == undefined ? Date.now() : element.id
        const newTag: Tag={
        id:id,
        name:req.body.name
    }
    tagArray.push(newTag);
    updateStorage();
    }
    });
    noteArray.push(newNote);
    updateStorage();
    res.send(newNote);

});
app.get('/api/note', (req,res)=>{
    res.send(noteArray);
});
app.get('/api/note/:id',(req,res)=>{
    const id=+req.params.id
    res.send(noteArray.find(noteArray=>noteArray.id==id));
});
app.put('/api/note/:id',(req,res)=>{
    const id =+req.params.id;
    noteArray[id]=req.body;
    updateStorage();
    res.send(req.body);
});
app.delete('/api/note/:id',(req,res)=>{
    const id=+req.params.id;
    noteArray.splice(noteArray.findIndex(noteArray=>noteArray.id==id))
    updateStorage();
    
});


//////////////////////////////////Tag////////////////////


app.post('/api/tag',(req,res)=>{  
    const id = req.body.id == undefined ? Date.now() : req.body.id
    const newTag: Tag={
        id:id,
        name:req.body.name
    }
    tagArray.push(newTag);
    updateStorage();
    res.send(newTag);

});
app.get('/api/tag', (req,res)=>{
    res.send(tagArray);
});
app.get('/api/tag/:id',(req,res)=>{
    const id=+req.params.id
    res.send(tagArray.find(tagArray=>tagArray.id==id));
});
app.put('/api/tag/:id',(req,res)=>{
    const id =+req.params.id;
    tagArray[id]=req.body;
    updateStorage();
    res.send(req.body);
});
app.delete('/api/tag/:id',(req,res)=>{
    const id=+req.params.id;
    tagArray.splice(tagArray.findIndex(tagArray=>tagArray.id==id))
    updateStorage();  
});

///////////////////// Authorization ////////////////////////
app.post('/login', (req, res) => {
    const token = jwt.sign(req.body.login, 'topSecret')
    const newUser:User={
        login:req.body.login,
        password:req.body.password,
        token:token
    }
    
    if(token!== undefined){
        //if have login and passowrd
        if(newUser.login !== undefined&& newUser.password !== undefined){
            //if login is not taken => add to userArray
            if(!userArray.find(userArray=> userArray.login===newUser.login)){
                userArray.push(newUser)
                updateStorage()
                res.sendStatus(200)
            }else
            res.send('this login is taken')
        }
    }else res.sendStatus(401)
});

app.listen(3001,()=>{
console.log("conection succesful")
})