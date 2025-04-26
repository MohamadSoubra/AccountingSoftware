import { Role } from "./Role.model";

export class User{
    id: string;
    firstName: string;
    lastName: string;
    username: string;
    emailAddress: string;
    // password: string;
    roles: Role[]

    constructor({
        id="",
        firstName = "",
        lastName = "",
        username = "", 
        emailAddress = "",
        // password = "",
        roles = [],
    }={}){
        this.id = id ;
        this.firstName = firstName ;
        this.lastName = lastName ;
        this.username = username ;
        this.emailAddress = emailAddress ;
        // this.password = password ; 
        this.roles = roles ;
    }
}