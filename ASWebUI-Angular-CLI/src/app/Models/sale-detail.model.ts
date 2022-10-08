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
}


// export class SaleDetail implements Identification {
//   id?: string;
//   invoiceId: string;
//   productId: string;
//   saleId: string;
//   quantity: number;
//   price: number;
//   purchasePrice: number;
//   amount: number;
//   tax: number;
// }
