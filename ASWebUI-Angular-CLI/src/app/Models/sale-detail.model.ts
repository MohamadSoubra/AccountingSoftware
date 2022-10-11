import { Identification } from "./Identification.interface";
import { Product } from "./product.model"


export class SaleDetail implements Identification {
  id?: string;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  totalPrice: number;
  tax?: number;
  
  constructor({
    id = "",
    productName = "",
    description = "",
    quantity = 0,
    unitPrice = 0,
    totalPrice = 0,
    tax = 0,
  } = {}) {
    this.id = id;
    this.productName = productName;
    this.description = description;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.totalPrice = totalPrice;
    this.tax = tax;
  }
}