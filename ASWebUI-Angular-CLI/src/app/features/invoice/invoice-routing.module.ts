import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceModule } from './invoice.module';

const routes: Routes = [
  // {
  //   path: "",
  //   redirectTo: "invoices"
  // },
  {
    path: "invoices",
    component: InvoiceComponent,
  },
  {
    path: "/:id",
    loadChildren: () => import('../../shared/add-edit/add-edit.module').then(mod => mod.AddEditModule),
  }
];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes), InvoiceModule],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
