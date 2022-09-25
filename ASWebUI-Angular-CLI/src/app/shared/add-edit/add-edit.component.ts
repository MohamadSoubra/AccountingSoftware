import { Location } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsComponent } from 'src/app/components/clients/clients.component';
import { Client } from 'src/app/Models/client.model';
import { Invoice } from 'src/app/Models/invoice.model';
import { Product } from 'src/app/Models/product.model';
import { Supplier } from 'src/app/Models/supplier.model';
import { ApiHelperService } from 'src/app/services/ApiHelper.service';
// import { DisplayModalComponent } from '../modal/displayModal.component';

@Component({
  selector: "app-add-edit",
  templateUrl: "./add-edit.component.html",
  styleUrls: ["./add-edit.component.scss"],
})
export class AddEditComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private apiHelper: ApiHelperService,
    private route: ActivatedRoute,
    private router: Router,
    private location :Location
    ) {}
    
  @Input() displayItem: Product | Client | Supplier | Invoice = null;
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
  // autoCompleteValue: any;

  ngOnInit(): void {
    
    
    //console.log(Object.entries(this.displayItem));
    //this.displayItem = this.data.map((value) => String(value));
    console.log("this.displayItem AddEdit", this.displayItem);
    // console.log("this.displayItem.constructor.name", this.displayItem.constructor.name );
    // console.log("Object.keys(this.displayItem)", Object.keys(this.displayItem));
    // console.log("Object.keys(Product)", Object.keys(new Product()));
    // const newINvoive = new Invoice();
    // const invoiceTestType =  newINvoive;
    // console.log("typeof newINvoive", newINvoive.constructor.name);
    // console.log(
    //   "typeof invoiceTestType", invoiceTestType.constructor.name
    // );
    
    console.log("this.route", this.route.snapshot.firstChild);
    this.route.params.subscribe(p => {
      console.log("p",p);

      this.previousRoute = p[""];
      
      if (+p['id'] == 0) {
        console.log("is NAN");
        
        this.displayItem = this.apiHelper.InitializeType(p[""]);
      } else {
        console.log("! is NAN");
        this.displayItem = this.apiHelper.getByID(p[""],p["id"]);
        
        
      }
      
    })

   
    // console.log("this.route.snapshot.data", this.route);
    
    // const itemIndex :string =  this.route.snapshot.paramMap.get("item")
    
    // if (isNaN(+itemIndex)) {
    //   this.displayItem = this.apiHelper.InitializeType(itemIndex);
    // } else {
    //   this.displayItem = this.apiHelper.getInvoiceById(itemIndex);
    // }
      
    console.log("this.displayItem", this.displayItem);

    if (this.displayItem.id != undefined) {
      if (this.displayItem.id == "") {
        this.Title = `Add new ${this.displayItem.constructor.name}`;
      } else {
        this.Title = `Editing ${this.displayItem.constructor.name}  ${this.displayItem.id}`;
      }
    } else {
      this.Title = "Id was not found";
    }
    this.itemProperties = Object.keys(this.displayItem).map((prop) => {
      // this.labelstext.push({labelsText: this.formatText(prop), formControlName: prop});

      // this.itemFormArray.push(this.fb.control(''));
      // this.itemFormArray.

      let isBoolean = false;
      let needSelectInput = false;
      let needDatePicker = false;
      if (this.displayItem[prop] === true || this.displayItem[prop] === false) {
        isBoolean = true;
        //this.itemform.controls[prop].setValue((this.displayItem[prop]?  'true' : 'false'));
        this.itemform.addControl(
          prop,
          new FormControl(this.displayItem[prop].toString())
        );
      } else {
        if (prop.includes("client")) {
          needSelectInput = true;
          console.log("this.displayItem in need select input", this.displayItem);
          console.log("this.displayItem[prop] in need select input BEFORE ASSIGNING IT", this.displayItem[prop]);
          this.selectInputData = this.apiHelper.getClients();
          if (this.displayItem[prop]["id"] !== ""){
            console.log(true);
            
            this.displayItem[prop] = this.selectInputData.find(cl => cl.id === this.displayItem[prop]["id"]);
          }
          console.log("this.selectInputData.find(cl => cl.id === this.displayItem[prop] )", this.selectInputData.find(cl => cl.id === this.displayItem[prop]?.id));
          console.log("this.displayItem[prop] in need select input", this.displayItem[prop]);
          console.log("prop", prop);
          
        }

        if (prop.toLowerCase().includes("date")) {
          needDatePicker = true;
          this.itemform.addControl(
            prop,
            new FormControl(new Date(this.displayItem[prop]))
          );
        } else {
          this.itemform.addControl(
            prop,
            new FormControl(this.displayItem[prop])
          );
        }
      }

      // console.log(`${prop} string Length ${prop.length}`);
      // console.log(` string Length ${this.displayItem[prop].length}`);

      // if (
      //   this.displayItem[prop] != null ||
      //   this.displayItem[prop] != undefined
      // ) {
      //   String(this.displayItem[prop]);
      // }

      let needTextArea = false;
      if (prop === "description" || this.displayItem[prop]?.length > 20) {
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

      // this.formControlsArray.push({this.itemform. : this.fb.control("")});
      return {
        labelsText: this.formatText(prop),
        formControlName: prop,
        value: this.displayItem[prop],
        isBoolean: isBoolean,
        needTextArea: needTextArea,
        needSelectInput: needSelectInput,
        needDatePicker: needDatePicker,
        width: width,
      };
    });
    console.log("this.itemProperties", this.itemProperties);

    // console.log(this.itemFormArray);
    // console.log(`Item Propertes ${JSON.stringify(this.itemProperties)}`);
    // console.log(this.formControlsArray);

    // this.itemform = this.fb.group({ itemFormArray: this.itemFormArray });

    // console.log("this.itemform.controls.client", this.itemform.controls.client);
    // console.log("this.itemform", this.itemform);
    // console.log("this.selectInputData", this.selectInputData);

    document.documentElement.style.setProperty("--grd_col", "span 2");
  }

  onSubmit() {
    console.log("this.itemform", this.itemform);
    console.log("this.itemform.value",this.itemform.value);
    this.apiHelper.saveInvoice(this.itemform.value);
    this.router.navigate([`./${this.previousRoute}`]);

  }

  formatText(text: string) {
    text =
      text[0].toLocaleUpperCase() +
      text.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1);
    return text;
  }

  displayFn(client: Client): string {
    return client && client.firstName ? `${client.firstName} ${client.lastName}` : "";
  }

  //this methos is for getting the type of the object injected into this class
  //to dinamically change the material dialoge title
  getType(object) {
    // Object.keys(object).
  }

  Cancel(){
    // console.log(this.location);
    
    // this.location.back();
    // console.log("this.route.children", this.route.children);
    this.router.navigate([`./${this.previousRoute}`]);

    
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
    this.itemform.get(prop.formControlName).setValue({});
  }

  objectHasEmptyProperties(object) {
    if (Object.values(object).every((x) => x === null || x === "" || x === undefined)) {
      return true;
    } else {
      return false;
    }
  }
}
