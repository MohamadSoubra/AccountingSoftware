import { Identification } from "./Identification.interface";

export class Supplier implements Identification {
  id?: number;
  accountNumber: string;
  companyName: string;
  contactName: string;
  emailAddress: string;
  address: string;
  phoneNumber: string;
  country: string;
  city: string;

  constructor({
    id = 0 ,
    accountNumber = "",
    companyName = "",
    contactName = "",
    emailAddress = "",
    address = "",
    phoneNumber = "",
    country = "",
    city = "",
  } = {}) {
    this.id = id,
    this.accountNumber = accountNumber,
    this.companyName = companyName,
    this.contactName = contactName,
    this.emailAddress = emailAddress,
    this.address = address,
    this.phoneNumber = phoneNumber,
    this.country = country,
    this.city = city
  }
}










