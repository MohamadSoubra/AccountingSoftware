import { Role } from "./Role.model";

export class ApplicationUser{
    id: string;
    userName: string;
    firstName: string;
    lastName: string;
    emailAddress: string;
    password: string;
    userRoles: Role[]

    constructor({
        id="",
        userName = "", 
        firstName = "",
        lastName = "",
        emailAddress = "",
        password = "",
        userRoles = [],
    }={}){
        this.id = id ;
        this.userName = userName ;
        this.firstName = firstName ;
        this.lastName = lastName ;
        this.emailAddress = emailAddress ;
        this.password = password ; 
        this.userRoles = userRoles ;
    }
}