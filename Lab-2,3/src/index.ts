import { notStrictEqual } from "assert";
import { create } from "domain";
import express from "express";
import { Request, Response } from "express";
import fs from "fs";
import {NoteKeeper} from "./NoteKeep";
import {Note} from "./Note";

import {Tag} from "./Tag"

const app = express();

const date = new Date();



export const noteKeeper = new NoteKeeper();





app.use(express.json());

//Note API
app.get("/note/:id",(req:Request,res:Response)=>{
res.send(noteKeeper.Get("note",+req.params.id));

});
app.get("/note",(req:Request,res:Response)=>{
  res.send(noteKeeper.getNotesList());
  
  });
app.post("/note/id",(req:Request,res:Response)=>{
  res.send(noteKeeper.POST(req.body));
});
app.listen(3000);