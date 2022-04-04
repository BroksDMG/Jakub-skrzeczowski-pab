import { Tag } from "./Tag"
import { NoteKeeper } from "./NoteKeep";
import{noteKeeper} from "./index"
export class Note{
    title: string;
    content: string;
    createDate:string;
    tags:Tag[];
    id: number;

constructor(title:string,content:string,createDate:string,tags:Tag[],id?:number){

    if(id===undefined){
        this.id=Date.now();
    }else{
        this.id=id
    }
    

    this.title=title;
    this.content=content;
    this.createDate=createDate;
    this.tags=tags;
}
}
