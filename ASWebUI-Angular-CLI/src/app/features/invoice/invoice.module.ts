import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InvoiceComponent } from './invoice.component';
import { InvoiceRoutingModule } from './invoice-routing.module';
// import { TableComponent } from 'src/app/components/table/table.component';
import { TableModule } from 'src/app/shared/table/table.module';


@NgModule({
  declarations: [InvoiceComponent],
  imports: [CommonModule, TableModule],
  // exports: [InvoiceComponent],
})
export class InvoiceModule {}
