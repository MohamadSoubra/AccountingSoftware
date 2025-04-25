import { Identification } from "./Identification.interface";

export class apiUser implements Identification{
  id: string;
  username: string;
  email: string;
  token: string;

  constructor({id = "", username = "", email = "", token = ""} ={}) {
    this.id = id;
    this.username = username;
    this.email = email;
    this.token = token;
  }

  

}
