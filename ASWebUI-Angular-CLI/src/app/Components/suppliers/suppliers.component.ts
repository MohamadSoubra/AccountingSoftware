import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Identification } from 'src/app/models/Identification.interface';
import { Supplier } from 'src/app/models/supplier.model';
import { ApiHelperService } from 'src/app/services/ApiHelper.service';
import { TableDataSource } from 'src/app/sharedFeatures/table/table-datasource';

@Component({
  selector: "app-suppliers",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.scss"],
})
export class SuppliersComponent<T extends Identification> implements OnInit {
  suppliersList$: TableDataSource<T[]>;
  suppliersTableColumns: any = [
    {
      name: "Name",
      dataKey: "firstName",
      isSortable: true,
      isFilterable: true,
    },
    {
      name: "Last Name",
      dataKey: "lastName",
      isSortable: true,
      isFilterable: true,
    },
    {
      name: "Address",
      dataKey: "address",
      isSortable: true,
      isFilterable: true,
    },
    {
      name: "Email",
      dataKey: "emailAddress",
      isSortable: true,
      isFilterable: true,
    },
    {
      name: "Phone",
      dataKey: "phoneNumber",
      isFilterable: false,
    },
    {
      name: "Country",
      dataKey: "country",
      isFilterable: false,
    },
    {
      name: "City",
      dataKey: "city",
      isFilterable: false,
    },
  ];
  componentName: string = "Supplier";

  constructor(private api: ApiHelperService<T>) {}

  ngOnInit() {
    // this.suppliersList = this.api.getSuppliers();
  }

  getSuppliers(){
    // this.api.get
  }


}
