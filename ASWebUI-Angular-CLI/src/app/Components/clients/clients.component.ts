import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/Models/client.model';
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
  constructor(private api: ApiHelperService) {}

  ngOnInit() {
    this.clientList = this.api.getClients();
    // this.getClients();
    this.initializeColumns();
  }

  // getClients() {
  //   // if (!this.clientList) {
  //   this.api.getClients().subscribe(
  //     (clients) => {
  //       console.log(clients);
  //       this.clientList = clients;
  //     },
  //     (error) => {
  //       console.log("from Clients component");
  //       console.log(error);
  //     }
  //   );
  //   // }
  // }

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
