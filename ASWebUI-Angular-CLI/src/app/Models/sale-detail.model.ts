import { Identification } from "src/app/models/Identification.interface";
import { Product } from "./product.model"


export class SaleDetail implements Identification {
  id?: number;
  productId: number;
  invoiceId: number;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  subTotal: number;
  total: number;
  tax?: number;
  
  constructor({
    id = 0,
    invoiceId = 0,
    productId=0,
    productName = "",
    description = "",
    quantity = 0,
    unitPrice = 0,
    subTotal = 0,
    total = 0,
    tax = 0,
  } = {}) {
    this.id = id;
    this.invoiceId = invoiceId;
    this.productId = productId;
    this.productName = productName;
    this.description = description;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.subTotal = subTotal;
    this.total = total;
    this.tax = tax;
  }
}