export class NullException extends Error{

    constructor(message:string){
        super(message);
        this.name = "Null Exception";
    }
}