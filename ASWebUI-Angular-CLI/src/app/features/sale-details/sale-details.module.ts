import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SaleDetailsRoutingModule } from './sale-details-routing.module';
import { SaledetailComponent } from './saledetail/saledetail.component';


@NgModule({
  declarations: [
    SaledetailComponent
  ],
  imports: [
    CommonModule,
    SaleDetailsRoutingModule
  ]
})
export class SaleDetailsModule { }
