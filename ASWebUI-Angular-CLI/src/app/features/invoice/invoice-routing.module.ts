import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { AddEditRoutingModule } from 'src/app/shared/add-edit/add-edit-routing.module';
import { AddEditComponent } from 'src/app/Shared/add-edit/add-edit.component';
import { InvoiceComponent } from './invoice.component';
import { InvoiceModule } from './invoice.module';

const routes: Routes = [
  {
    path: "invoices",
    component: InvoiceComponent,
  },
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
