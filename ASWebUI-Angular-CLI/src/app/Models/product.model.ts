import { Identification } from "./Identification.interface";

export class Product implements Identification {
  id: string = "";
  productName: string = "";
  retailPrice: number = 0;
  quantityInStock: number = 0;
  isTaxable: boolean = false;
  description: string = "";

  constructor({
    id = "",
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
