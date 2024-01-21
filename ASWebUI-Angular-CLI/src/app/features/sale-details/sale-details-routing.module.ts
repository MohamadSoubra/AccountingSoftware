import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaledetailComponent } from './saledetail/saledetail.component';

const routes: Routes = [
  {
    path: "SaleDetails",
    component: SaledetailComponent,
    loadChildren: () => import('../../sharedFeatures/add-edit/add-edit.module').then(mod => mod.AddEditModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleDetailsRoutingModule { }
