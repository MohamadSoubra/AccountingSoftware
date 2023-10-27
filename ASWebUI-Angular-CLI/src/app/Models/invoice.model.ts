import { Client } from "./client.model";
import { Identification } from "./Identification.interface";
import { SaleDetail } from "./sale-detail.model";
import { Sale } from "./sale.model";

// interface ClientName{
//   [client: string]: string | number;
// }

export class Invoice<T> implements Identification {
  id: number;
  // [client: string | number]: string | number | Client;
  client?: Client ;
  // clientId: number;
  sale? : Sale;
  invoiceNumber: string;
  description: string;
  invoiceDate: string;
  paymentDueDate: string;
  amountDue: number;
  status: string;
  saleDetails: T[];
  // subTotal: number;
  // tax: number;
  // total;


  constructor({
    id = 0,
    invoiceNumber = "",
    client = new Client(),
    // clientId = 0,
    description = "",
    invoiceDate = "",
    paymentDueDate = "",
    amountDue = 0,
    status = "Pending",
    saleDetails = [],
    sale = new Sale()
  } = {}) {
    this.id = id;
    this.invoiceNumber = invoiceNumber;
    // this.clientId = clientId;
    this.client = client;
    this.description = description;
    this.invoiceDate = invoiceDate;
    this.paymentDueDate = paymentDueDate;
    this.amountDue = amountDue;
    this.status = status;
    this.saleDetails = saleDetails;
    this.sale=sale;
  }
}
