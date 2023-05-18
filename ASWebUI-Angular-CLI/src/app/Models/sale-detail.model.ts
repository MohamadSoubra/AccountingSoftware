import { Identification } from "./Identification.interface";
import { Product } from "./product.model"


export class SaleDetail implements Identification {
  id?: number;
  productName: string;
  description: string;
  quantity: number;
  unitPrice: number;
  total: number;
  tax?: number;
  
  constructor({
    id = 0,
    productName = "",
    description = "",
    quantity = 0,
    unitPrice = 0,
    total = 0,
    tax = 0,
  } = {}) {
    this.id = id;
    this.productName = productName;
    this.description = description;
    this.quantity = quantity;
    this.unitPrice = unitPrice;
    this.total = total;
    this.tax = tax;
  }
}