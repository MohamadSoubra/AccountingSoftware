import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client.model';
import { ApiHelperService } from 'src/app/services/ApiHelper.service';

@Component({
  selector: "app-clients",
  templateUrl: "./clients.component.html",
  styleUrls: ["./clients.component.scss"],
})
export class ClientsComponent implements OnInit {
  clientList: Client[];
  clientTableColumns: any;
  componentName: string = "Client";
  paginationSizes: any[];
  defaultPageSize: number;
  constructor(private api: ApiHelperService) {}

  ngOnInit() {
    // this.clientList = this.api.getClients();
    this.initializeColumns();
    this.getClients();
    console.log("this.clientList", this.clientList);
    
  }

  getClients() {
    this.api.getClients().subscribe(x => { this.clientList = x },
      (error) => {
        console.log("from products component", error);
      }
    );
  }

  edit(client){
    console.log("Edited Client",client);
    
  }
  
  delete(client){
    console.log("Deleted Client",client);

  }

  initializeColumns(): void {
    /*
    Client {
      Id: string;
      firstName: string;
      lastName: string;
      emailAddress: string;
      address: string;
      phoneNumber: string;
    }*/

      this.clientTableColumns = [
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
        name: "Phone Number",
        dataKey: "phoneNumber",
        isFilterable: false,
      },
    ];
  }

}
