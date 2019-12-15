export interface User{
    _id:string;
    username:string;
    password:string;
    status:string;  //deactivated or activated
    privilege:string  //site manager
}