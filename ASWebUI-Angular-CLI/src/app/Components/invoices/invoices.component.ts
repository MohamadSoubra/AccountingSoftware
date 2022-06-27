import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { Invoice } from 'src/app/Models/invoice.model';
import { Client } from 'src/app/Models/client.model';
import { ApiHelperService } from 'src/app/services/ApiHelper.service';
import { TableColumn } from '../table/table.component';
import { ClientsComponent } from '../clients/clients.component';
import { InvoiceDBModel } from 'src/app/Models/invoice-dbmodel.model';
import { Sale } from 'src/app/Models/sale.model';
import { SaleDetail } from 'src/app/Models/sale-detail.model';

@Component({
  selector: "app-invoices",
  templateUrl: "./invoices.component.html",
  styleUrls: ["./invoices.component.scss"],
})
export class InvoicesComponent implements OnInit {
  InvoiceList = [];
  invoice: Invoice;
  productsTableColumns: TableColumn[];
  paginationSizes: any[];
  defaultPageSize: number;
  componentName: string = "Invoice";
  editmode: boolean = false;

  myControl = new FormControl();
  filteredClients: Observable<Client[]>;

  Clients: Client[];

  constructor(private api: ApiHelperService) {}

  ngOnInit() {
    this.Clients = this.api.getClients();
    // console.log("this.Clients", this.Clients);

    this.initializeColumns(this.editmode);

    //this.getProducts();

    const saledetails = [
      {
        id: "1004",
        quantity: 10,
        product: {
          productName: "NewProduct",
          description: "Added From Angular",
          quantityInStock: 10,
          id: "999",
          isTaxable: false,
          retailPrice: 9999,
        },
        price: 100,
        amount: 1000,
      },
      {
        id: "1005",
        quantity: 10,
        product: {
          productName: "NewProduct",
          description: "Added From Angular",
          quantityInStock: 10,
          id: "999",
          isTaxable: false,
          retailPrice: 9999,
        },
        price: 100,
        amount: 1000,
      },
      {
        id: "1006",
        quantity: 10,
        product: {
          productName: "NewProduct",
          description: "Added From Angular",
          quantityInStock: 10,
          id: "999",
          isTaxable: false,
          retailPrice: 9999,
        },
        price: 100,
        amount: 1000,
      },
      {
        id: "1007",
        quantity: 10,
        product: {
          productName: "NewProduct",
          description: "Added From Angular",
          quantityInStock: 10,
          id: "999",
          isTaxable: false,
          retailPrice: 9999,
        },
        price: 100,
        amount: 1000,
      },
      {
        id: "1008",
        quantity: 10,
        product: {
          productName: "NewProduct",
          description: "Added From Angular",
          quantityInStock: 10,
          id: "999",
          isTaxable: false,
          retailPrice: 9999,
        },
        price: 100,
        amount: 1000,
      },
      {
        id: "1009",
        quantity: 10,
        product: {
          productName: "NewProduct",
          description: "Added From Angular",
          quantityInStock: 10,
          id: "999",
          isTaxable: false,
          retailPrice: 9999,
        },
        price: 100,
        amount: 1000,
      },
    ];
    const InvoicestoDisplay = this.api.getInvoices();

    if(!this.editmode){
      this.InvoiceList = InvoicestoDisplay.map((invoice) => {
          return {
            id: invoice.id,
            clientId: invoice.clientId,
            amountDue: invoice.amountDue,
            description: invoice.description,
            invoiceDate: invoice.invoiceDate,
            invoiceNumber: invoice.invoiceNumber,
            paymentDueDate: invoice.paymentDueDate,
            status: invoice.status,
          };
      });
    }else{
      this.InvoiceList = saledetails;
    }
    

    // InvoicestoDisplay.forEach(invoice => {
    //   this.InvoiceList.push(
    //     {
    //       invoiceNumber : invoice.invoiceNumber,
    //       client : this.Clients.find(client => client.id == invoice.clientId),
    //       amountDue : invoice.amountDue,
    //       invoiceDate : invoice.invoiceDate,
    //       paymentDueDate : invoice.paymentDueDate,
    //       status : invoice.status,
    //       sale : new Sale(),
    //       description : invoice.description,
    //       id : invoice.id
    //     })

    // })

    console.log("this.InvoiceList", this.InvoiceList);

    // const InvoiceArray = this.getdummyInvoices().map(i => i.clientname = i.client.firstName);

    this.filteredClients = this.myControl.valueChanges.pipe(
      startWith(""),
      map((value) => (typeof value === "string" ? value : value.name)),
      map((name) => (name ? this._filter(name) : this.Clients.slice()))
    );
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

  initializeColumns(editmode: boolean): void {
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
    if (editmode === true) {
      this.productsTableColumns = [
        {
          name: "Product Name",
          dataKey: "product",
          nestedProperty: "productName",
          isSortable: true,
          isFilterable: true,
        },
        {
          name: "Description",
          dataKey: "product",
          nestedProperty: "description",
          isSortable: true,
          isFilterable: true,
        },
        {
          name: "Quantity",
          dataKey: "quantity",
          isSortable: true,
          isFilterable: true,
        },
        {
          name: "Price",
          dataKey: "price",
          isSortable: true,
          isFilterable: true,
        },
        {
          name: "Amount",
          dataKey: "amount",
          isSortable: true,
          isFilterable: true,
        },
      ];
    } else {
      this.productsTableColumns = [
        {
          name: "Invoice Number",
          dataKey: "invoiceNumber",
          isSortable: true,
          isFilterable: true,
        },
        {
          name: "Client",
          dataKey: "clientId",
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
  }

  edit(element: any) {
    console.log(element);
  }

  delete(element) {
    this.InvoiceList = this.InvoiceList.filter((el) => el !== element);
    console.log("this.InvoiceList AFTER DELETE", this.InvoiceList);
  }

  toggleEditmode(){
    if(this.editmode === true){
      this.editmode = false;
    }else{
      this.editmode = true;
    }
    console.log(this.editmode);
    
  }

}
