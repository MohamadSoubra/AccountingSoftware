import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AddEditRoutingModule } from './add-edit-routing.module';
import { AddEditComponent } from './add-edit.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularMaterialModule } from '../angular-material/angular-material.module';
// import { AddEditTableComponent } from './add-edit-table/add-edit-table.component';
import { RecordPropertyGetterPipe } from './add-edit-table/record-property-getter.pipe';
import { TableComponent } from '../table/table.component';
import { TableModule } from '../table/table.module';



@NgModule({
  declarations: [AddEditComponent, RecordPropertyGetterPipe],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    AddEditRoutingModule,
    TableModule
    
  ],
  exports: [AddEditComponent],
})
export class AddEditModule {}
