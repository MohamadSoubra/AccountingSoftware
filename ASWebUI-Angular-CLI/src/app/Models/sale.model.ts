import { SaleDetail } from "./sale-detail.model";

export class Sale {
    id: number;
    cashierId: string;
    saleDate: string;
    subTotal: number;
    tax: number;
    total: number;

    constructor({
        id = 0,
        cashierId = "",
        saleDate = "",
        subTotal = 0,
        tax = 0,
        total = 0
    } = {}) {
        this.id = id;
        this.cashierId = cashierId;
        this.saleDate = saleDate;
        this.subTotal = subTotal;
        this.tax = tax;
        this.total = total;
    }
}
