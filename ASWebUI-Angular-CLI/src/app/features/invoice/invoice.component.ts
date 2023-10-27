import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { BehaviorSubject, combineLatest, Observable, of } from "rxjs";
import { map, startWith } from "rxjs/operators";
import { Invoice } from "src/app/models/invoice.model";
import { Client } from "src/app/models/client.model";
import { ApiHelperService } from "src/app/services/ApiHelper.service";
import { ActivatedRoute, Router } from "@angular/router";
import { Identification } from "src/app/models/Identification.interface";
import { TableDataSource } from "src/app/sharedFeatures/table/table-datasource";
// import { TableColumn } from "../../Components/table/table.component";

@Component({
  selector: "app-invoice",
  templateUrl: "./invoice.component.html",
  styleUrls: ["./invoice.component.scss"],
})
export class InvoiceComponent<T extends Identification> implements OnInit {
  InvoiceList$ : TableDataSource<T[]>;
  invoice: Invoice<T>;
  client: Client;
  invoicesTableColumns = [];
  paginationSizes: any[];
  defaultPageSize: number;
  componentName: string = "Invoice";
  editmode: boolean = false;

  myControl = new FormControl();
  filteredClients: Observable<Client[]>;

  Clients: Client[] = [];

  constructor(private api: ApiHelperService<T[][]>, private router: Router,
    private actRout: ActivatedRoute,) {
      api.recsType = "Invoice"
      this.InvoiceList$ = new TableDataSource<T[]>(api);
    }

  ngOnInit() {
    
    this.initializeColumns();
    // this.Clients = this.api.getClients();
    // this.getClients();
    // console.log("this.Clients", this.Clients);
    // this.getInvoices();
    
    // this.InvoiceList$.FechData();
  

    console.log("this.InvoiceList", this.InvoiceList$);

    // const InvoiceArray = this.getdummyInvoices().map(i => i.clientname = i.client.firstName);

    this.filteredClients = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.Clients.slice()))
    );
  }

  getInvoices(): void{
    // this.getClients();
    // console.log("this.Clients",this.Clients);                                          
    
    // this.api.getInvoices().subscribe(invoices => {
    //   this.api.getClients().subscribe(clients => {
    //     console.log("clients in get invs", clients);
        
    //     invoices.map(inv => {
    //       clients.map(cli =>{
    //         if(inv.client.id === cli.id){
    //           inv.client = cli;
    //         }
    //       })
    //     })
    //   })
      
    //   return this.InvoiceList = invoices
      
    // })

    this.api.getInvoices()

  }

  getClients() {
    // this.api.getClients().subscribe(clients =>{
    //   this.Clients = clients
    // })
    this.api.getClients()
  }

  displayFn(user: Client): string {
    return user && user.firstName ? user.firstName : "";
  }

  private _filter(name: string): Client[] {
    const filterValue = name.toLowerCase();

    return this.Clients.filter((option) =>
      option.firstName.toLowerCase().includes(filterValue)
    );
  }

  // getInvoices() {
  //   this.api.getProducts().subscribe(
  //     (x) => {
  //       this.InvoiceList = x;
  //     },
  //     (error) => {
  //       console.log("from Invoices component", error);
  //     }
  //   );
  // }

  initializeColumns(): void {
    //     Invoice {
    //
    //  Id: number;
    //  invoicenumber: string;
    //  clientId: string;
    //  saleDetailId:string;
    //  description:string;
    //  paymentDueDate: string;
    //  amountDue: string;
    // }

      this.invoicesTableColumns = [
        {
          name: "Invoice Number",
          dataKey: "invoiceNumber",
          // dataKey: "id",
          isSortable: true,
          isFilterable: true,
        },
        {
          name: "Client",
          dataKey: "client",
          isFilterable: true,
          nestedProperty: "firstName",
        },
        {
          name: "Description",
          dataKey: "description",
          isFilterable: true,
        },
        {
          name: "Due Date",
          dataKey: "paymentDueDate",
          isSortable: true,
          isFilterable: true,
        },
        {
          name: "Invoice Date",
          dataKey: "invoiceDate",
          isSortable: true,
          isFilterable: true,
        },
        {
          name: "Amount",
          dataKey: "amountDue",
          isSortable: true,
          isFilterable: true,
        },
        {
          name: "Status",
          dataKey: "status",
          isSortable: true,
          isFilterable: true,
        },
      ];
    
  }

  batchDelete(){

  }

  AddRecord(){
    this.router.navigate(["./", 0], {
      relativeTo: this.actRout,
    });
    
  }

  edit(element: any) {
    console.log(element);
  }

  delete(element) {
    // this.InvoiceList$ = this.InvoiceList$.filter((el) => el !== element);
    // console.log("this.InvoiceList AFTER DELETE", this.InvoiceList);
  }

  toggleEditmode() {
    if (this.editmode === true) {
      this.editmode = false;
    } else {
      this.editmode = true;
    }
    console.log(this.editmode);
  }
}
