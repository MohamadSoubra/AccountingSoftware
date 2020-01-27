import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { createWiresService } from 'selenium-webdriver/firefox';
import { ThrowStmt } from '@angular/compiler';
import { Product } from 'src/app/models/product.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  productList: Product[];
  
  constructor(private data:HttpService) { }

  ngOnInit() {
    
    this.data.getProducts().subscribe((products) => {
      console.log(products)
      this.productList = products as Product[];
      });
  }
}
