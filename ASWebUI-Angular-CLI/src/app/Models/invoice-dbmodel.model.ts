export class InvoiceDBModel {
  id: string;
  // [client: string | number]: string | number | Client;
  clientId: string;
  invoiceNumber: string;
  description: string;
  invoiceDate: string;
  paymentDueDate: string;
  amountDue: number;
  status: string;

  constructor({
    id = "",
    invoiceNumber = "",
    clientId = "",
    description = "",
    invoiceDate = "",
    paymentDueDate = "",
    amountDue = 0,
    status = "Pending",
  } = {}) {
    this.id = id;
    this.invoiceNumber = invoiceNumber;
    this.clientId = clientId;
    this.description = description;
    this.invoiceDate = invoiceDate;
    this.paymentDueDate = paymentDueDate;
    this.amountDue = amountDue;
    this.status = status;
  }
}
