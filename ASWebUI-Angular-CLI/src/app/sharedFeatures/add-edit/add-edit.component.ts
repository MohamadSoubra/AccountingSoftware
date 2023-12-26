import { ObserversModule } from '@angular/cdk/observers';
import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { switchMap,map } from 'rxjs/operators';
import { Client } from 'src/app/models/client.model';
import { Invoice } from 'src/app/models/invoice.model';
import { SaleDetail } from 'src/app/models/sale-detail.model';
import { Sale } from 'src/app/models/sale.model';
import { ApiHelperService } from 'src/app/services/ApiHelper.service';
import { TableDataSource } from '../table/table-datasource';
import { TableColumn } from '../table/table.component';

@Component({
  selector: "app-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.scss"],
})
export class AddEditComponent<T> implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private apiHelper: ApiHelperService<T>,
    private actroute: ActivatedRoute,
    private router: Router,
    private location: Location,
    private _cdr: ChangeDetectorRef,

  ) { }

  // @Input() displayItem: Product | Client | Supplier | Invoice ;
  displayItem: any;
  displayItemOBS: any;
  // @Input() displayItem: Invoice = null;

  Title: string = "NO-ID";
  itemProperties;
  itemFormArray = this.fb.array([]);
  formControlsArray = [];
  itemform = this.fb.group({});
  labelstext = [];
  selectValue = false;
  selectInputData: any;
  selectInputValue: any;
  previousRoute: string;
  saledetailscolumns: TableColumn[];
  saleDetailsData: TableDataSource<T>;
  hasSailDetails: boolean = false;
  isSaleDetails: boolean = false;
  isInvoice: boolean = false;
  disabled = true;

  needTable: boolean = false;
  //temp variable
  ClientName: String;

  currentItemId: number;

  subTotal: number = 0;
  tax: number = 0;
  total: number= 0;
  // autoCompleteValue: any;

  IPO: Observable<T>;


  ngOnInit(): void {
    // console.log("this.apiHelper.objectbyId", this.apiHelper.objectbyId);
    // this.saleDetailsData = [{
    //   description: "Added From SSMS",
    //   id: 1010,
    //   invoiceId: 1,
    //   productId: 5,
    //   productName: "Product 5",
    //   purchasePrice: 7650,
    //   quantity: 5,
    //   saleId: 1010,
    //   subtotal: 150,
    //   tax: 13.125,
    //   total: 163.125
    // }, {
    //   description: "Added From SSMS",
    //   id: 1011,
    //   invoiceId: 1,
    //   productId: 10,
    //   productName: "Product 10",
    //   purchasePrice: 10000,
    //   quantity: 10,
    //   saleId: 1010,
    //   subtotal: 150,
    //   tax: 13.125,
    //   total: 163.125
    // }];
    console.log("this.actroute.snapshot.params[\"\"]", this.actroute.snapshot.params[""]);
    console.log("this.actroute.snapshot.params[\"id\"]", this.actroute.snapshot.params["id"]);
    
    
    


    if (+this.actroute.snapshot.params["id"] === 0) {

      this.displayItem = this.apiHelper.InitializeType(this.actroute.snapshot.params[""]);


      this.GenerateFormFromObject(this.displayItem);
      
      
    } else {
      // this.apiHelper.getByID(this.actroute.snapshot.params[""], this.actroute.snapshot.params["id"]).subscribe(objbyid => {
      //   console.log("objbyid.constructor.name", objbyid.constructor.name);
      //   console.log("objbyid", objbyid);
      //   console.log("objbyid.invoiceNumber", objbyid.invoiceNumber);
      //   console.log(`objbyid["client"]`, objbyid["client"]);
      //   console.log(`objbyid.client`, objbyid.client);

      //   this.GenerateFormFromObject(objbyid);

      //   this.saleDetailsData = objbyid["saleDetails"];
      //   console.log("this.saleDetailsData", this.saleDetailsData);
        

      // })
    //IPO -> ItemPropertiesObservable

    
      
      
      if (this.actroute.snapshot.params[""] === "invoices"){
        this.apiHelper.recsType = "Saledetail";
        this.IPO = this.apiHelper.getByID<T>(this.actroute.snapshot.params[""], this.actroute.snapshot.params["id"]).pipe(
          switchMap(invoice => {
            
            const inv = new Invoice(invoice);
            // inv.client = invoice["client"];
            inv.client = invoice["client"];
            console.log("Invoice Client", invoice["client"]);
            console.log("Invoice after adding Client", invoice);
            
            console.log("inv",inv);
            // console.log("inv client",inv);
            
            // return this.apiHelper.getRecords<T[]>('Saledetail', this.actroute.snapshot.params["id"]);

            return this.apiHelper.getRecords('Saledetail',this.actroute.snapshot.params["id"]).pipe(
              map((SALEDTS) => {
                if (!this.apiHelper.objectIsEmpty(SALEDTS)) {
                  const converted = SALEDTS.map(RTSALEDTS => {
                    return  new SaleDetail(RTSALEDTS)
                  })
                  
                  inv.saleDetails = converted
                  this.saleDetailsData = new TableDataSource<T>(SALEDTS);
                  // this.saleDetailsData.FechData(inv.id);
                }
                // this.subTotal = inv.sale.subTotal;
                // this.tax = inv.sale.tax;
                // this.total = inv.sale.total;
                // console.log("this.subTotal", this.subTotal);
                // console.log("this.tax", this.tax);
                // console.log("this.total", this.total);
                return inv;
              })
            )
          })
        );
      }else{
        this.IPO = this.apiHelper.getByID(this.actroute.snapshot.params[""], this.actroute.snapshot.params["id"]);
        // console.log("this.actroute.snapshot.params[\"\"]", this.actroute.snapshot.params[""]);
      }
      

      this.IPO.subscribe(itemprops =>{
        // console.log(itemprops);
        // this.itemProperties = itemprops;
        this.GenerateFormFromObject(itemprops);
      })

      // console.log("IPO", this.IPO);
      // console.log("this.itemProperties",this.itemProperties);
      
    }

    // console.log("this.displayItem", this.displayItem); 
    // console.log("this.displayItemOBS", this.displayItemOBS); 
    // console.log("this.subTotal", this.subTotal);
    // console.log("this.tax", this.tax);
    // console.log("this.total", this.total);


    
  }

  ngAfterViewInit(): void {
    //Called after ngAfterContentInit when the component's view has been initialized. Applies to components only.
    //Add 'implements AfterViewInit' to the class.




  }



  onSubmit() {
    // let submitted = this.formatDate(this.itemform.value);
    console.log("this.itemform.value", this.itemform.value);
    // console.log("submitted", submitted);
    // // console.log("this.itemform.value",this.itemform.value);
    // let aRecord = this.apiHelper.InitializeType(this.previousRoute)
    // Object.keys(aRecord).forEach(key => {
    //   aRecord[key] = this.itemform.value[key]
    // })
    // this.apiHelper.saveRecord(aRecord);
    // this.router.navigate([`./${this.previousRoute}`]);
    const invoiceId = +this.actroute.snapshot.url[1].path
    const invoices = this.apiHelper.getInvoices()
    // let invoiceToUpdate = invoices.find(inv => inv.id == invoiceId)
    let invoiceToUpdate = this.apiHelper.getInvoiceById(invoiceId);

    // console.log("this.itemform.value", this.itemform.value);
    // console.log("invoiceToUpdate before",invoiceToUpdate);
    if (this.isSaleDetails) {
      // console.log("this.actroute", this.actroute);
      // console.log("invoiceId", invoiceId);

      // if(invoiceToUpdate.saleDetails.length > 1){
      //   invoiceToUpdate.saleDetails.push({
      //     productName: this.itemform.value.productName,
      //     description : this.itemform.value.description,
      //     quantity : this.itemform.value.quantity,
      //     unitPrice : this.itemform.value.unitPrice,
      //     tax : this.itemform.value.tax,
      //     totalPrice : this.itemform.value.totalPrice,
      //   })
      //   // console.log("invoiceToUpdate",invoiceToUpdate);
      // }else{
      //   invoiceToUpdate.saleDetails = (new SaleDetail({
      //     productName : this.itemform.value.productName,
      //     description : this.itemform.value.description,
      //     quantity : this.itemform.value.quantity,
      //     unitPrice : this.itemform.value.unitPrice,
      //     tax : this.itemform.value.tax,
      //     totalPrice : this.itemform.value.totalPrice,
      //   }))
      // }

      // console.log("invoiceToUpdate after", invoiceToUpdate);

    }

  }

  formatText(text: string) {
    text =
      text[0].toLocaleUpperCase() +
      text.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1);
    return text;
  }

  // selectedclient(event){
  //   console.log("selectedclient event", event.option.value);

  // }

  displayFn(client: Client): string {
    // console.log("client from diplayfn before init", client);
    if(client){
      client = new Client(client);
    }else {
      client = new Client()   // console.log("client from diplayfn", client)
    }     
    return client && client.firstName || client.lastName ? client.getFullName() : '';
  }

  addSaleDetail(){
    const newSaleDetail = new SaleDetail({invoiceId:162,productId:17,productName:"Product15", description:"Description Added From Code",quantity:12,unitPrice:9,total:555});
    // this.saleDetailsData = new TableDataSource([{ invoiceId: 162, productId: 17, productName: "Product15", description: "Description Added From Code", quantity: 12, unitPrice: 9, total: 555 }][]);
    // console.log("this.saleDetailsData", this.saleDetailsData.);
    
    // console.log("this.saleDetailsData.getValue()",this.saleDetailsData.value);
        
    // this.saleDetailsData.pipe(map((sds)=>{return sds.push(newSaleDetail)}))
    // console.log("this.saleDetailsData.getValue()",this.saleDetailsData.value);
    

    // this.itemform.get("saleDetails").setValue(saleDetails);


    
    
    // let SDs = this.itemform.get("saleDetails").value;
    // console.log("SDs", SDs);
    
    // // console.log("SDs before",SDs);
    // SDs = SDs.push(newSaleDetail);
    // // console.log("SDs after",SDs);
    // this.itemform.get("saleDetails").setValue(SDs);
    // // console.log('this.displayItem.constructor.name',this.displayItem.constructor.name);
    // this.saleDetailsData = SDs;
    // this.apiHelper.saveSaleDetails([newSaleDetail]).subscribe();
    // this._cdr.detectChanges();
    // this.apiHelper.deleteRecord(element, "SaleDetail")
  }

  //this method is for getting the type of the object injected into this class
  //to dinamically change the material dialoge title
  getType(object) {
    // Object.keys(object).
  }

  Cancel() {
    this.location.back();
  }

  AddClient() {
    const newClient = new Client();

    // this.dialog
    //   .open(DisplayModalComponent, {
    //     data: newClient,
    //     panelClass: "DisplayModal",
    //   })
    //   .afterClosed()
    //   .subscribe((res) => {
    //     if (!this.objectHasEmptyProperties(res)) {
    //       this.itemform.controls.client.setValue(res);
    //       // this.autoCompleteValue = res;
    //     }
    //   });
  }

  autoCompleteIsEmpty(prop): boolean {
    if (prop.formControlName !== "client") {
      return;
    } else {
      let formControlValue = this.itemform.get(prop.formControlName).value;
      if (typeof formControlValue === "object" && formControlValue !== null) {
        return this.objectHasEmptyProperties(formControlValue);
      }
    }
  }

  resetAutoComplete(prop) {
    // console.log("prop from reset", prop);

    this.itemform.get(prop.formControlName).setValue({});
    this.selectInputValue = {};
  }

  objectHasEmptyProperties(object) {
    if (Object.values(object).every((x) => x === null || x === "" || x === undefined)) {
      return true;
    } else {
      return false;
    }
  }

  edit(event) {

  }


  delete(element) {
    
    let SDs = this.itemform.get("saleDetails").value;
    // console.log("SDs before",SDs);
    SDs = SDs.filter(sd => sd.id != element.id)
    // console.log("SDs after",SDs);
    this.itemform.get("saleDetails").setValue(SDs);
    // console.log('this.displayItem.constructor.name',this.displayItem.constructor.name);
    
    this.apiHelper.deleteRecord(element, "SaleDetail")
  }

  formatDate(object) {
    if (Object.keys(object).forEach)
      Object.keys(object).map(prop => {
        if (prop.toLowerCase().includes("date")) {
          object[prop] = new Date(object[prop]).toDateString()
        }
      })
    return object;
  }

  GenerateFormFromObject(object) {
    if (object) {
      this.itemProperties = Object.keys(object).map((prop) => {
        let isBoolean = false;
        let needSelectInput = false;
        let needDatePicker = false;
        if (object[prop] === true || object[prop] === false) {
          isBoolean = true;
          this.itemform.addControl(
            prop,
            new FormControl(object[prop].toString())
          );
        } else {
          if (prop === "client") {
            needSelectInput = true;
            this.isInvoice = true;
            // this.apiHelper.getClients().subscribe(clients => {
            //   this.selectInputData = clients;
            // })




          }

          if (prop.toLowerCase().includes("date")) {
            needDatePicker = true;
            this.itemform.addControl(
              prop,
              new FormControl(new Date(object[prop]))
            );
          } else {
            this.itemform.addControl(
              prop,
              new FormControl(object[prop])
            );
          }
        }

        if (object.id != undefined) {
          if (object.id == 0) {
            this.Title = `Add new ${object.constructor.name}`;
          } else {
            this.Title = `Editing ${object.constructor.name}  ${object.id}`;
          }
        }



        let needTextArea = false;
        if (prop === "description" || object[prop]?.length > 20) {
          needTextArea = true;
        }

        let width: string = "";

        switch (prop) {
          case "firstName":
            width = "350";
            break;

          case "lastName":
            width = "50";
            break;

          default:
            width = "100";
            break;
        }

        /*this.saledetailscolumns = [
          {
            name: "Product Name",
            dataKey: "productName",
            isSortable: true,
            isFilterable: true,
            position: "right"
          },
          {
            name: "Description",
            dataKey: "description",
            isFilterable: true,
          },
          {
            name: "Quantity",
            dataKey: "quantity",
            isSortable: true,
            isFilterable: true,
          },
          {
            name: "Purchase Price",
            dataKey: "purchasePrice",
            isSortable: true,
            isFilterable: true,
          },
          {
            name: "Total Price",
            dataKey: "totalPrice",
            isFilterable: false,
          }

        ]*/
        // SaleDetail
        this.saledetailscolumns = [
          {
            name: "Product Name",
            dataKey: "productName",
            isSortable: true,
            isFilterable: true,
            position: "right"
          },
          {
            name: "Description",
            dataKey: "description",
            isFilterable: true,
          },
          {
            name: "Quantity",
            dataKey: "quantity",
            isSortable: true,
            isFilterable: true,
          },
          {
            name: "Unit Price",
            dataKey: "unitPrice",
            isSortable: true,
            isFilterable: true,
          },
          {
            name: "Total",
            dataKey: "total",
            isFilterable: false,
          }

        ]

        // SaleDetail

        // export class SaleDetail implements Identification {
        //   id?: number;
        //   productName: string;
        //   description: string;
        //   quantity: number;
        //   purchasePrice: number;
        //   totalPrice: number;
        //   tax?: number;


        this.needTable = false;
        if (prop === "saleDetails") {
          this.subTotal = object.sale?.subTotal
          this.tax = object.sale?.tax
          this.total = object.sale?.total

          console.log("object for totals", object);
          
          
          this.needTable = true;


          console.log("object.saleDetails", object.saleDetails);
          

          // this.saleDetailsData = new TableDataSource<T[]>(object.saleDetails);
          // this.saleDetailsData = new TableDataSource<T>(this.apiHelper.getSaleDetailsByInvoiceID(object.id));
          this.apiHelper.getSaleDetailsByInvoiceID(object.id).subscribe(SDTS =>{
            this.saleDetailsData = new TableDataSource(SDTS);
          })
          // this.saleDetailsData.FechData();
          console.log("this.saleDetailsData", this.saleDetailsData);

          this.apiHelper.recID = object.id;
          
          // console.log("object[\"saleDetails\"]", object["saleDetails"]);
          
          // this.apiHelper.getSaleDetailsByInvoiceID(object.id).subscribe(SaleDetailes => {
          //   console.log(SaleDetailes);
          //   object.saleDetails=SaleDetailes;
          //   this.subTotal = SaleDetailes["subtotal"];
          //   this.tax = SaleDetailes["tax"];
          //   this.total = SaleDetailes["total"];;
          //   this.saleDetailsData = SaleDetailes;

          //   if (this.apiHelper.objectIsEmpty(SaleDetailes)) {
          //     console.log("SALE DETAILS ARE EMPTYYYYYYYYYY!!!!");


          //   } else {

          //     console.log("SALE DETAILS HAVE DATAAAAAAAAAAAA!!!");

          //     // if (SaleDetailes.length === 1) {
          //     //   this.subTotal = SaleDetailes[0].totalPrice
          //     //   this.tax = SaleDetailes[0].tax
          //     // } else {


          //     //   this.subTotal = SaleDetailes.reduce((previousValue, currentValue, index) => {
          //     //     // console.log("previousValue",previousValue);
          //     //     // console.log("currentValue",currentValue);

          //     //     return previousValue + currentValue.purchasePrice

          //     //   }, 0)

          //     //   this.tax = SaleDetailes.reduce((previousValue, currentValue) => {
          //     //     return previousValue + currentValue.tax
          //     //   }, 0)

          //     // }
          //   }





          //   // console.log("this.total", this.total);
          //   // console.log("this.subTotal", this.subTotal);
            
          //   // this.total = this.subTotal * this.tax;




          //   // if (this.saleDetailsData.length > 0) {
          //   //   this.hasSailDetails = true;
          //   // }


          // });

        }
        

        // console.log("object parameter", object);

        // this.formControlsArray.push({this.itemform. : this.fb.control("")});
      
        return {
          labelsText: this.formatText(prop),
          formControlName: prop,
          value: object[prop],
          isBoolean: isBoolean,
          needTextArea: needTextArea,
          needSelectInput: needSelectInput,
          needDatePicker: needDatePicker,
          needTable: this.needTable,
          width: width,
        };
      });
    }
  }
}



