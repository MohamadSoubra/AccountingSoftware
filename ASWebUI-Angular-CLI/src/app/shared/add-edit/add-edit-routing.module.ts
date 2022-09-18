import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './add-edit.component';
import { AddEditModule } from './add-edit.module';

const routes: Routes = [
  { path: ":/:id", component: AddEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
//   imports: [AddEditModule.forChild(routes)],
//   exports: [AddEditModule]
})
export class AddEditRoutingModule { }
