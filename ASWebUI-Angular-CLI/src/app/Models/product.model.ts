import { Identification } from "./Identification.interface";

export class Product implements Identification {
  id: number;
  productName: string
  retailPrice: number;
  quantityInStock: number;
  isTaxable: boolean;
  description: string

  constructor({
    id = 0,
    productName = "",
    retailPrice = 0,
    quantityInStock = 0,
    isTaxable = false,
    description = "",
  } = {}) {
    this.id = id;
    this.productName = productName;
    this.retailPrice = retailPrice;
    this.quantityInStock = quantityInStock;
    this.isTaxable = isTaxable;
    this.description = description;
  }
}
