import { Identification } from './Identification.interface';
export class Client implements Identification {
  id: number;
  firstName: string;
  lastName: string;
  emailAddress: string;
  phoneNumber: string;
  address: string;

  constructor({
    id = 0,
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
