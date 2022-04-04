import {Tag} from "./Tag"
import {Note} from "./Note"
import fs from "fs"

export class NoteKeeper{
    notesArray:Note[]=[];
    tagsArray:Tag[]=[];
    constructor(){
        this.readStorage();
    }
    private async readStorage(): Promise<void> {
        try {
            this.notesArray = JSON.parse(await fs.promises.readFile("src/data/notes.json", 'utf-8'));
            this.tagsArray = JSON.parse(await fs.promises.readFile("src/data/tags.json", 'utf-8'));
        } catch (err) {
            console.log(err)
        }
      }

      private async updateStorage(): Promise<void> {
        try {
            await fs.promises.writeFile("/notes.json", JSON.stringify(this.notesArray));
            await fs.promises.writeFile("/tags.json", JSON.stringify(this.tagsArray));
        } catch (err) {
            console.log(err)
        }
      }  
      
      getTagsList(){
          return this.tagsArray;
      }
      getNotesList(){
          return this.notesArray;
      }
      Get(obj:string,id:number){
          if(obj==="note"){
              const obj =this.notesArray.find((note)=>(note.id===id));
              return obj;
          }else if(obj==="tag"){
              const obj=this.tagsArray.find((tag)=>(tag.id===id));
              return obj;
          }
      }
      POST(obj:any){
          if(obj instanceof Note){
              this.notesArray.push(obj)
              this.updateStorage()
              return (`${obj} added`)
          }
          else{
              return ("not added")
          }
      }
      



}
