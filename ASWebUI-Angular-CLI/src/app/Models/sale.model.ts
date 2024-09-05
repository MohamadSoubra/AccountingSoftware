import { SaleDetail } from "./sale-detail.model";

export class Sale {
    id: number;
    invoiceId: number;
    cashierId: string;
    saleDate: string;
    subTotal: number;
    tax: number;
    total: number;

    constructor({
        id = 0,
        cashierId = "",
        invoiceId = 0,
        saleDate = new Date().toISOString(),
        subTotal = 0,
        tax = 0,
        total = 0
    } = {}) {
        this.id = id;
        this.cashierId = cashierId;
        this.invoiceId = invoiceId;
        this.saleDate = saleDate;
        this.subTotal = subTotal;
        this.tax = tax;
        this.total = total;
    }
}
