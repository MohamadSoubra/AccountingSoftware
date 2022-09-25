import { Identification } from './Identification.interface';
export class Client implements Identification {
  id: string;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;

  // constructor(client: Client) {
  //   this.id = client.id || "";
  //   this.firstName = client.firstName || "";
  //   this.lastName = client.lastName || "";
  //   this.emailAddress = client.emailAddress || "";
  //   this.address = client.address || "";
  //   this.phoneNumber = client.phoneNumber || "";
  // }

  constructor({
    id = "",
    firstName = "",
    lastName = "",
    emailAddress = "",
    phoneNumber = "",
    address = "",
    } = {}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.address = address;

    
  }

  public getFullName(): string{
    return `${this.firstName} ${this.lastName}`
  }

}
