import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { AddEditComponent } from './add-edit.component';
import { AddEditModule } from './add-edit.module';

const routes: Routes = [
  { path: ":/:id", component: AddEditComponent },
  { path: ":/:id/:/:id", component: AddEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AddEditRoutingModule { }
