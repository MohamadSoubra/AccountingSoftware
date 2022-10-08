import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditRoutingModule } from './add-edit-routing.module';
import { AddEditComponent } from './add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
import { AddEditTableComponent } from './add-edit-table/add-edit-table.component';
import { DataPropertyGetterPipeAddEdit } from './data-property-getter-add-edit/data-property-getter-pipe-add-edit';


@NgModule({
  declarations: [AddEditComponent, AddEditTableComponent, DataPropertyGetterPipeAddEdit],
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
