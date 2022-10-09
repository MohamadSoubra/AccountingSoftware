import { Component, OnInit } from "@angular/core";
import { ApiHelperService } from "src/app/services/ApiHelper.service";
import { Product } from "src/app/models/product.model";
// import { TableColumn } from "../table/table.component";
import { CurrencyPipe, DecimalPipe } from "@angular/common";

@Component({
  selector: "app-products", 
  templateUrl: "./products.component.html",
  styleUrls: ["./products.component.scss"],
})
export class ProductsComponent implements OnInit {
  //productList: Product[] = [
  productList: Product[];
  productsTableColumns = [];
  paginationSizes: any[];
  defaultPageSize: number;
  componentName: string = "Product";

  constructor(private api: ApiHelperService) {}

  ngOnInit() {
    this.initializeColumns();
    
    //this.getProducts();
    this.productList = this.api.getProducts();

    
    
  }

  getProducts() {
    // this.api.getProducts().subscribe(x => { this.productList = x},
    //   (error) => {
    //     console.log("from products component", error);
    //   }
    // );
    
  }

  initializeColumns(): void {
    //     Product {
    //     
    //     Id: number;
    //     productName: string;
    //     Description: string;
    //     retailPrice: number;
    //     quantityInStock: number;
    //     IsTaxable: boolean;
    // }

    this.productsTableColumns = [
      {
        name: "Name",
        dataKey: "productName",
        isSortable: true,
        isFilterable: true,
        position: "right"
      },
      {
        name: "Description",
        dataKey: "description",
        isFilterable: true,
      },
      {
        name: "Price",
        dataKey: "retailPrice",
        isSortable: true,
        isFilterable: true,
      },
      {
        name: "Quantity",
        dataKey: "quantityInStock",
        isSortable: true,
        isFilterable: true,
      },
      {
        name: "Taxable",
        dataKey: "isTaxable",
        isFilterable: false,
      },

    ];
  }


  edit(element: any) {
    console.log(element);
  }
  
  delete(element: Product) {
    //console.log(element);
    // this.api.deleteProducts(element).subscribe(
    //   (x) => {
    //     console.log(x);
    //   },
    //   (error) => {
    //     //console.log("from products component");
    //     console.log(error);
    //   }
    // );
    this.productList = this.productList.filter(el => el !== element);
    console.log("this.productList AFTER DELETE", this.productList);
    
  }

}
