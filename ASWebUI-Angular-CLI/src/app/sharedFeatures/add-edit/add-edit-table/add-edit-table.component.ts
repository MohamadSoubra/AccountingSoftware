import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { MatPaginator, PageEvent } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { ActivatedRoute, Router } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { Client } from "src/app/models/client.model";
import { Identification } from "src/app/models/Identification.interface";
import { Invoice } from "src/app/models/invoice.model";
import { Product } from "src/app/models/product.model";
import { SaleDetail } from "src/app/models/sale-detail.model";
import { Supplier } from "src/app/models/supplier.model";
import { ApiHelperService } from "src/app/services/ApiHelper.service";
import { TableDataSource } from "../../table/table-datasource";
import { TableColumn } from "../../table/table.component";
// import { TableDataSource } from "./table-datasource";

@Component({
  selector: 'app-add-edit-table',
  templateUrl: './add-edit-table.component.html',
  styleUrls: ['./add-edit-table.component.scss']
})
export class AddEditTableComponent<T extends Identification> implements OnInit {
  
  public displayedColumns: string[];


  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
    

  @ViewChild(MatSort, { static: false }) matSort: MatSort;
    

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[];
  @Input() hasActionColumn = false;
  @Input() hasCheckboxColumn = false;
  @Input() paginationSizes = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[0];
  @Input() componentName: string;

  @Output() actionEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() actionDelete: EventEmitter<any> = new EventEmitter<any>();

  

  @Input() tableData: T[];


  filterInputs = {};
  filterObject: any;
  pagedData: MatTableDataSource<any>;
  isColumnFiltered = false;
  selection = new SelectionModel<any>(true, []);
  ActionColumn: string;
  CheckboxColumn: string;

  tableFooter: string[] = ['footer']

  columnsNumber: number;



  newTableDataSource : any;

  emptyFilters = true;

  // displayDialog: MatDialogRef<DisplayModalComponent<T>, T>;

  displayedColumnFilters: any[];
  constructor(
    private dialog: MatDialog,
    private api: ApiHelperService,
    private router: Router,
    private actRout: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {
    
    
  }

  ngOnInit(): void {


    this.InitialzeColumns();
    // console.log("this.tableData",this.tableData);


  }
  
  
  ngAfterViewInit() {

    // this.newTableDataSource = new MatTableDataSource(this.tableData);
    this.newTableDataSource = new TableDataSource(this.tableData);
    if(this.isPageable){

      this.newTableDataSource.paginator = this.matPaginator;
      this.cd.detectChanges();
    }

    if(this.isSortable){
      this.newTableDataSource.sort = this.matSort;
    }
    
    
    ///https://stackoverflow.com/questions/62710052/mat-sort-ascending-with-null-values-to-last
    ///For moving null values always to the bottom
    
    //Added ChangeDetectorRef for the error ExpressionChangedAfterItHasBeenCheckedError
    //got this error after assigning data to the datasource in NgAfterViewInit function
    //since paginator only get initialized in NgAfterViewInit
    this.cd.detectChanges();
  }

  private fillDataPaginator(data: T[]) {

    const startIndex = this.matPaginator.pageIndex * this.matPaginator.pageSize;
    
    if (
      data.length - startIndex < this.matPaginator.pageSize &&
      data.length > this.matPaginator.pageSize) 
      {
      let diff = this.matPaginator.pageSize - (data.length - startIndex);
      
      for (let i = 0; i < diff; i++) {
        data.push(Object.create(null));
      }
    }
    
    const test = data.splice(startIndex, this.matPaginator.pageSize);
    console.log('test',test);
    
    return test;
  }

  getSortingOrder = (order, a, b) => {
    const sorted = order === "asc" ? [a, b] : [b, a];
    return sorted;
  };

  prindData() {
    // console.log(this.tableDataItems);
    // console.log(this.table);
  }

  // edit(element: any) {
  //   this.actionEdit.emit(element);
  // }

  delete(element) {
    console.log(element);

    // let data: any = this.tableDataItems.DATA$.value.filter(
    //   (el) => el != element
    // );
    // this.tableDataItems.DATA$.next(data);
    // this.tableDataItems.paginator = this.matPaginator;
    // if (this.matPaginator.pageIndex >= this.matPaginator.getNumberOfPages()) {
    //   this.matPaginator.previousPage();
    // }
  }

  setTableDataSource(data: any[]) {
    this.newTableDataSource = new TableDataSource(data);
    this.newTableDataSource.sort = new MatSort();
    console.log("this.matPaginator",this.matPaginator);
    
    console.log("this.newTableDataSource", this.newTableDataSource);
  }

  clearFilters() {
    // this.tableDataItems.filterChange$.next("");
    console.log(this.filterInputs);
    this.filterInputs = {};
    this.emptyFilters = true;
  }

  clearInput(inputName) {
    this.filterInputs[inputName] = "";
    if (
      Object.keys(this.filterInputs).every(
        (input) => this.filterInputs[input] == ""
      )
    ) {
      // this.tableDataItems.filterChange$.next("");
      this.emptyFilters = true;
    } else {
      // this.tableDataItems.filterChange$.next(JSON.stringify(this.filterInputs));
      this.emptyFilters = false;
    }
  }
  //https://stackoverflow.com/questions/48276404/filtering-specific-column-in-angular-material-table-in-angular-5/48400406?noredirect=1#comment84008277_48400406
  //Rui Marques's answer
  setupFilter(column: string) {
    console.log(column);

    return;
    // this.tableDataItems.filterPredicate = (
    //   d: MatTableDataSource<any>,
    //   filter: string
    // ) => {
    //   //console.log(column);
    //   //console.log(d.retailPrice.toString());
    //   if (d[column] != undefined || d[column] != null) {
    //     const textToSearch =
    //       (d[column].toString() && d[column].toString().toLowerCase()) || "";
    //     return textToSearch.indexOf(filter) !== -1;
    //   } else {
    //     //console.log("undefined");
    //   }
    //   //console.log(textToSearch.indexOf(filter) !== -1);
    // };

    //this.tableDataSource.columnName = column;
  }

  applyFilter(event: Event, filter: string[]) {
    if (
      Object.keys(this.filterInputs).every(
        (input) => this.filterInputs[input] == ""
      )
    ) {
      // this.tableDataItems.filterChange$.next("");
      this.emptyFilters = true;
    } else {
      // this.tableDataItems.filterChange$.next(JSON.stringify(this.filterInputs));
      this.emptyFilters = false;
    }
  }

  printFilters(f: any) {
    console.log(f);
  }

  ///https://stackblitz.com/edit/angular-material2-table?file=app%2Fapp.component.html
  ///This link is for checkboxes
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    // return
    // console.log(this.tableData);

    const numSelected = this.selection.selected.length;
    let numRows = 0

    // if (this.newTableDataSource && this.newTableDataSource.DATA$){

    //   numRows = this.newTableDataSource.DATA$.value.length;
    // }else{
    //   numRows = 0;
    // }

    // let numRows = this.newTableDataSource.data.length;
    //console.log(`num Rows ${numRows}`);
    //console.log(this.tableDataSource);

    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    // return
    if (this.isAllSelected()) {
      this.selection.clear();
      return;
    }
    // this.selection.select(...this.newTableDataSource.DATA$.value);
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: TableColumn): string {
    // return
    if (!row) {
      return `${this.isAllSelected() ? "deselect" : "select"} all`;
    }
    return `${this.selection.isSelected(row) ? "deselect" : "select"} row ${
      row.position + 1
    }`;
  }

  ngAfterContentChecked() {
    //console.log(this.tableData);
    // console.log(
    //   "this.matPaginator in ngAfterContentChecked",
    //   this.matPaginator
    // );
    // this.tableDataItems.paginator = this.matPaginator;
    //this.tableDataItems.sort = this.matSort;
    // this.table.dataSource = this.tableDataItems;
    // this.tableDataItems = new TableDataSource(this.tableData);
  }

  batchDelete() {
    return;
    // const DeletionResult = this.tableDataItems.DATA$.value.filter(
    //   (item) => !this.selection.selected.includes(item)
    // );
    // this.tableDataItems.DATA$.next(DeletionResult);
    // this.selection.clear();
    // if (this.matPaginator.pageIndex >= this.matPaginator.getNumberOfPages()) {
    //   this.matPaginator.previousPage();
    // }
  }


  // openDialog(data: T) {
  //   this.displayDialog = this.dialog.open(DisplayModalComponent, {
  //     data: data,
  //     panelClass: "DisplayModal",
  //   });
  // }

  AddRecord() {
    // this.router.navigate(["./", 0], {
    //   relativeTo: this.actRout,
    // });
  }

  edit(item: T) {
    this.router.navigate([`./saleDetails`, item.id],
    {relativeTo: this.actRout,

    });
  }

  InitialzeColumns() {
    // console.log("this.tableColumns" , this.tableColumns);
    
    const columnNames = this.tableColumns.map(
      (tableColumn: TableColumn) => tableColumn.name
    );
    if (this.hasActionColumn) {
      this.ActionColumn = "ActionColumn";
      if (this.hasCheckboxColumn) {
        this.CheckboxColumn = "CheckboxColumn";
        this.displayedColumns = [
          "CheckboxColumn",
          ...columnNames,
          "ActionColumn",
          "footer"
        ];
      } else {
        this.displayedColumns = [...columnNames, "ActionColumn"];
      }
      //console.log(true);
    } else {
      this.displayedColumns = columnNames;
    }

    this.columnsNumber = this.displayedColumns.length
    
  }

  objectIsEmpty(object) {
    let emptyProperties;
    if (object) {
      emptyProperties = Object.keys(object)?.every(
        (prop) => prop?.length === 0
      );
    }

    if (
      !object ||
      (Object.keys(object)?.length === 0 && object.constructor === Object) ||
      emptyProperties ||
      JSON.stringify(object) === "{}"
    ) {
      return true;
    }

    return false;
  }
}

