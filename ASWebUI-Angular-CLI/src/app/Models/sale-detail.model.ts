import { Identification } from "./Identification.interface";
import { Product } from "./product.model"

export class SaleDetail implements Identification {
  id?: string;
  quantity: number;
  product: Product;
  price: number;
  amount: number;
}
