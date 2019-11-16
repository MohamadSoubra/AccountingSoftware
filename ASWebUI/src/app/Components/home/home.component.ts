import { Component, OnInit } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';
import { createWiresService } from 'selenium-webdriver/firefox';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(private data:HttpService) { }

  ngOnInit() {
    
      this.data.getProducts().subscribe(product => {
        console.log(product)
      });
  }
}
