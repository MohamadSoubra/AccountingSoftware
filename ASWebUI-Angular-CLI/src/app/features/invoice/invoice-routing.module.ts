import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InvoiceComponent } from './invoice.component';
import { InvoiceModule } from './invoice.module';

const routes: Routes = [
  {
    path: "invoices",
    component: InvoiceComponent,
    loadChildren: () => import('../../sharedFeatures/add-edit/add-edit-routing.module').then(mod => mod.AddEditRoutingModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class InvoiceRoutingModule { }
