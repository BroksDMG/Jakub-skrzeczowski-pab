export class Tag{
    id?:number;
    name:string;

constructor(name:string ,id?:number){
    if(id==undefined){
        this.id= Date.now();
    }else{
    this.id=id;
    }
    this.name=name;
    }
}