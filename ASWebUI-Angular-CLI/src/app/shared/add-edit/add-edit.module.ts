import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditRoutingModule } from './add-edit-routing.module';
import { AddEditComponent } from './add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';


@NgModule({
  declarations: [AddEditComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AddEditRoutingModule,
  ],
  exports: [AddEditComponent],
})
export class AddEditModule {}
