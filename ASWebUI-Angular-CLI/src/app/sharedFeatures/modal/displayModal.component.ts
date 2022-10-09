import { Component, Inject, OnInit } from "@angular/core";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialog, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { isEmpty } from "rxjs/operators";
import { ClientsComponent } from "src/app/components/clients/clients.component";
import { Client } from "src/app/models/client.model";
import { Identification } from "src/app/models/Identification.interface";
import { Product } from "src/app/models/product.model";
import { ApiHelperService } from "src/app/services/ApiHelper.service";

@Component({
  selector: "app-overView",
  templateUrl: "./displayModal.component.html",
  styleUrls: ["./displayModal.component.scss"],
})
export class DisplayModalComponent<T extends Identification> implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) public displayItem,
    private fb: FormBuilder,
    private dialog: MatDialog,
    private apiHelper: ApiHelperService
  ) {}

  Title: string = "NO-ID";
  itemProperties;
  itemFormArray = this.fb.array([]);
  formControlsArray = [];
  itemform = this.fb.group({});
  labelstext = [];
  selectValue = false;
  selectInputData: any;
  selectInputValue: any;
  // autoCompleteValue: any;

  ngOnInit(): void {
    //console.log(Object.entries(this.displayItem));
    //this.displayItem = this.data.map((value) => String(value));
    console.log("this.displayItem", this.displayItem);
    // console.log("this.displayItem.id", this.displayItem.id);
    // console.log("this.displayItem.constructor.name", this.displayItem.constructor.name );
    // console.log("Object.keys(this.displayItem)", Object.keys(this.displayItem));
    // console.log("Object.keys(Product)", Object.keys(new Product()));

    if (this.displayItem.id != undefined) {
      if (this.displayItem.id == "") {
        this.Title = `Add new ${this.displayItem.constructor.name}`;
      } else {
        this.Title = `Editing ${this.displayItem.constructor.name}  ${this.displayItem.id}`;
      }
    } else {
      this.Title = "Id was not found";
    }
    this.itemProperties = Object.keys(this.displayItem)
      .map((prop) => {
        // this.labelstext.push({labelsText: this.formatText(prop), formControlName: prop});

        // this.itemFormArray.push(this.fb.control(''));
        // this.itemFormArray.

        let isBoolean = false;
        let needSelectInput = false;
        let needDatePicker = false;
        if (
          this.displayItem[prop] === true ||
          this.displayItem[prop] === false
        ) {
          isBoolean = true;
          //this.itemform.controls[prop].setValue((this.displayItem[prop]?  'true' : 'false'));
          this.itemform.addControl(
            prop,
            new FormControl(this.displayItem[prop].toString())
          );
        } else {
          if (prop === "client") {
            needSelectInput = true;
            this.selectInputData = this.apiHelper.getClients();
            
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
          
          default : 
            width ="100";
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
  }

  onSubmit() {
    console.log("this.itemform", this.itemform);
    console.log(this.itemform.value);
  }

  formatText(text: string) {
    text =
      text[0].toLocaleUpperCase() +
      text.replace(/([a-z])([A-Z])/g, "$1 $2").slice(1);
    return text;
  }

  displayFn(client: Client): string {
    return client && client.firstName ? client.firstName : "";
  }
  

  //this methos is for getting the type of the object injected into this class
  //to dinamically change the material dialoge title
  getType(object) {
    // Object.keys(object).
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
    //     if(!this.objectHasEmptyProperties(res)){
    //       this.itemform.controls.client.setValue(res) 
    //       // this.autoCompleteValue = res;
    //     }
    //   });
  }

  autoCompleteIsEmpty(prop): boolean {
    if (prop.formControlName !== 'client' ){
      return;
    }else{
      let formControlValue = this.itemform.get(prop.formControlName).value
      if (typeof formControlValue === 'object'){
        return this.objectHasEmptyProperties(formControlValue);
      }
    }
  }

  resetAutoComplete(prop){
    this.itemform.get(prop.formControlName).setValue({});
  }

  objectHasEmptyProperties(object){
    if (Object.values(object).every((x) => x === null || x === "")) {
      return true;
    } else {
      return false;
    }
  }

  
}
