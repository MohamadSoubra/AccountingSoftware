import { Client } from "./client.model";
import { SaleDetail } from "./sale-detail.model";
import { Sale } from "./sale.model";

// interface ClientName{
//   [client: string]: string | number;
// }

export class Invoice {
  id: string;
  // [client: string | number]: string | number | Client;
  client?: Client ;
  sale? : Sale;
  invoiceNumber: string;
  description: string;
  invoiceDate: string;
  paymentDueDate: string;
  amountDue: number;
  status: string;
  saleDetails: SaleDetail[];


  constructor({
    id = "",
    invoiceNumber = "",
    client = new Client(),
    description = "",
    invoiceDate = "",
    paymentDueDate = "",
    amountDue = 0,
    status = "Pending",
    saleDetails = [],
  } = {}) {
    this.id = id;
    this.invoiceNumber = invoiceNumber;
    this.client = client;
    this.description = description;
    this.invoiceDate = invoiceDate;
    this.paymentDueDate = paymentDueDate;
    this.amountDue = amountDue;
    this.status = status;
    this.saleDetails = saleDetails;
  }
}
