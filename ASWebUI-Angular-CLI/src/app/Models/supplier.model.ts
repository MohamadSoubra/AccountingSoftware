import { Identification } from "./Identification.interface";

export class Supplier implements Identification {
  id: number;
  firstName: string;
  lastName: string;
  address: string;
  emailAddress: string;
  phoneNumber: string;
  country: string;
  city: string;

  //   constructor(supplier : Supplier) {
  //     this.id = supplier.id || "";
  //     this.firstName = supplier.firstName || "";
  //     this.lastName = supplier.lastName || "";
  //     this.emailAddress = supplier.emailAddress || "";
  //     this.address = supplier.address || "";
  //     this.phoneNumber = supplier.phoneNumber || "";
  //     this.country = supplier.country || "";
  //     this.city = supplier.city || "";
  //   }

  constructor({
    id = 0,
    firstName = "",
    lastName = "",
    address = "",
    emailAddress = "",
    phoneNumber = "",
    country = "",
    city = "",
  } = {}) {
    this.id = id;
    this.firstName = firstName;
    this.lastName = lastName;
    this.address = address;
    this.emailAddress = emailAddress;
    this.phoneNumber = phoneNumber;
    this.country = country;
    this.city = city;
  }
}
