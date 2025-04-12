import { Identification } from "./Identification.interface";

export class User implements Identification{
  id: string;
  username: string;
  email: string;
  token: string;

  constructor(id: string = "", username: string = "", email: string = "", token: string = "") {
      this.id = id;
      this.username = username;
      this.email = email;
      this.token = token;
  }
}
