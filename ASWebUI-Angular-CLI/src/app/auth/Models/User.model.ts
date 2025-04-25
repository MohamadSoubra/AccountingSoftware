import { Role } from "./Role.model";

export class User{
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    // password: string;
    roles: Role[]

    constructor({
        id="",
        userName = "", 
        firstName = "",
        lastName = "",
        emailAddress = "",
        // password = "",
        userRoles = [],
    }={}){
        this.id = id ;
        this.username = userName ;
        this.firstName = firstName ;
        this.lastName = lastName ;
        this.emailAddress = emailAddress ;
        // this.password = password ; 
        this.roles = userRoles ;
    }
}