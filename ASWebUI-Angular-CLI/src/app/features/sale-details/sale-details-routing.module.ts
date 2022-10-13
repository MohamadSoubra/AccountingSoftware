import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SaleDetailComponent } from 'src/app/components/sale-detail/sale-detail.component';

const routes: Routes = [
  {
    path: "SaleDetails",
    component: SaleDetailComponent,
    loadChildren: () => import('../../sharedFeatures/add-edit/add-edit.module').then(mod => mod.AddEditModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleDetailsRoutingModule { }
