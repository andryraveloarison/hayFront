export interface UserInterface {
    _id: string;
    username: string; 
    email: string;
    online: string;
}


export interface loginInterface {
    email: string;
    password: string;
}


export interface registerInterface {
    username: string,
    email: string;
    password: string;
}