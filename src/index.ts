import express from 'express'
import {Request, Response} from 'express'

const app = express()

app.use(express.json())

app.get('/', function (req: Request, res: Response) {
  res.send('GET Hello World')
})
app.post('/', function (req: Request, res: Response) {
  console.log(req.body) // e.x. req.body.title 
  res.sendStatus(200).send('POST Hello World')
})

interface Note{
    titile : string;
    content : string;
    tags?: string[];
    createData: string;
    id?: number;
};
let notes: Note[] =[{
    id:1,
    titile: "test",
    content: 'test',
    createData: 'test',

}]
app.post('/note', function (req: Request, res: Response) {
  const data = new Date().toISOString()
  const id = req.body.id == null? Date.now(): req.body.id
  const newNote : Note =
  {
    id : id, 
    titile : req.body.titile,
    content : req.body.content,
    createData : data,
    tags : req.body.tags
  }
  
  
  const noteTags = req.body.tags as Tag[]
  noteTags.forEach(element => {
    if(!tags.findIndex(tag=>tag.name === element.name))
    {
      const tagId = element.id == null? Date.now(): element.id
      const newTag : Tag =
      {
        id: tagId,
        name: element.name.toLowerCase()
      }
      tags.push(newTag)
    }
  });

  if(newNote.titile!==null && newNote.content!==null)
  {
    notes.push(newNote);
    console.log(req.body) 
    res.sendStatus(201).send(newNote.id)
  }else{
    res.sendStatus(400).send("no title or content")
  }
  })

app.get('/note/:id', function (req: Request, res: Response) {
  const id = parseInt(req.body.id)
  if(notes.findIndex(note=>note.id == id)){
    res.sendStatus(200).send(notes.findIndex(note=>note.id == id))
  }else{
    res.sendStatus(404).send("error")
  }
})


app.get('/note', function (req: Request, res: Response) {
  if(notes != null)
    res.sendStatus(200).send(notes)
  else
    res.sendStatus(400).send("empty")
})

app.put('/note/:id', function (req: Request, res: Response) {
  const id = parseInt(req.body.id)
  if(notes.findIndex(note=>note.id == id)){
    notes[notes.findIndex(note=>note.id == id)] = req.body;
    res.sendStatus(200).send(notes.findIndex(note=>note.id == id))
  }else{
    res.sendStatus(404).send("error")
  }
})


app.delete('/note/:id', function(req: Request, res: Response){
  const id = parseInt(req.body.id)
  if(notes.find(note=>note.id == id)){
    res.sendStatus(200).send(notes.findIndex(note=>note.id == id))
    notes.splice(notes.findIndex(note=>note.id == id),1)
  }else{
    res.sendStatus(404).send("error")
  }
})

interface Tag {
  id?: number
  name: string;
}

let tags : Tag[] =[
  {
    id: 1,
    name: "test"
  }
]

app.post('/tag', function (req: Request, res: Response) {
  const id = req.body.id == null? Date.now(): req.body.id
  const newTag : Tag =
  {
    id : id, 
    name : req.body.name
  }
  if(newTag.name!==null)
  {
    tags.push(newTag);
    console.log(req.body) 
    res.sendStatus(201).send(newTag.id)
  }else{
    res.sendStatus(400).send("no name")
  }
  
  })

app.get('/tag/:id', function (req: Request, res: Response) {
  const id = parseInt(req.body.id)
  if(tags.findIndex(tag=>tag.id == id)){
    res.sendStatus(200).send(tags.findIndex(tag=>tag.id == id))
  }else{
    res.sendStatus(404).send("error")
  }
})

app.get('/tags', function (req: Request, res: Response) {
  if(tags != null)
    res.sendStatus(200).send(tags)
  else
    res.sendStatus(400).send("empty")
})

app.put('/tag/:id', function (req: Request, res: Response) {
  const id = parseInt(req.body.id)
  if(tags.findIndex(tag=>tag.id == id)){
    tags[tags.findIndex(tag=>tag.id == id)] = req.body;
    res.sendStatus(200).send(tags.findIndex(tag=>tag.id == id))
  }else{
    res.sendStatus(404).send("error")
  }
})

app.delete('/tag/:id', function(req: Request, res: Response){
  const id = parseInt(req.body.id)
  if(tags.find(note=>note.id == id)){
    res.sendStatus(200).send(tags.findIndex(tag=>tag.id == id))
    notes.splice(tags.findIndex(tag=>tag.id == id),1)
  }else{
    res.sendStatus(404).send("error")
  }
})

app.listen(3001)