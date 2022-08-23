import { SelectionModel } from "@angular/cdk/collections";
import {
  AfterViewInit,
  ChangeDetectionStrategy,
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
import { Client } from "src/app/Models/client.model";
import { Identification } from "src/app/Models/Identification.interface";
import { Invoice } from "src/app/Models/invoice.model";
import { Product } from "src/app/Models/product.model";
import { SaleDetail } from "src/app/Models/sale-detail.model";
import { Supplier } from "src/app/Models/supplier.model";
import { ApiHelperService } from "src/app/services/ApiHelper.service";
import { DisplayModalComponent } from "src/app/shared/modal/displayModal.component";
import { DataPropertyGetterPipe } from "./data-property-getter/data-property-getter-pipe";
import { TableDataSource } from "./table-datasource";

export interface TableColumn {
  name: string; // column name
  dataKey: string; // name of key of the actual data in this column
  nestedProperty?: string; //name of the property if data contains nested ojects
  position?: "right" | "left" | "center"; // should it be right-aligned or left-aligned?
  isSortable?: boolean; // can a column be sorted?
  isFilterable?: boolean; // can a column be filterd?
}

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.scss"],
})
export class TableComponent<T extends Identification> implements OnInit, AfterViewInit
{
  public tableDataItems = new TableDataSource<T>([]);
  public displayedColumns: string[];

  @ViewChild(MatPaginator, { static: false }) matPaginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) matSort: MatSort;
  //@ViewChild(MatSort) matSort: MatSort;

  // @ViewChild(MatTable) table: MatTable<T>;

  @Input() isPageable = false;
  @Input() isSortable = false;
  @Input() isFilterable = false;
  @Input() tableColumns: TableColumn[];
  // @Input() rowActionIcon: string;
  // @Input() CheckboxColumn: string;
  @Input() hasActionColumn = false;
  @Input() hasCheckboxColumn = false;
  @Input() paginationSizes = [5, 10, 15];
  @Input() defaultPageSize = this.paginationSizes[0];
  @Input() componentName: string;

  //@Output() sort: EventEmitter<Sort> = new EventEmitter();
  @Output() actionEdit: EventEmitter<any> = new EventEmitter<any>();
  @Output() actionDelete: EventEmitter<any> = new EventEmitter<any>();

  // this property needs to have a setter, to dynamically get changes from parent component
  // @Input() set tableData(data: any[]) {
  //   //this.setTableDataSource(data);
  // }

  @Input() tableData: T[];

  //@Output() pageevent: PageEvent;

  filterInputs = {};
  filterObject: any;
  pagedData: MatTableDataSource<any>;
  isColumnFiltered = false;
  selection = new SelectionModel<any>(true, []);
  ActionColumn: string;
  CheckboxColumn: string;

  newTableDataSource: TableDataSource<T>;

  emptyFilters = true;

  displayDialog: MatDialogRef<DisplayModalComponent<T>, T>;

  displayedColumnFilters: any[];
  constructor(
    private dialog: MatDialog,
    private api: ApiHelperService,
    private router: Router,
    private actRout: ActivatedRoute
  ) {
    //this.tableDataItems = new TableDataSource(this.tableData);
    // this.table.dataSource = new TableDataSource(this.tableData);
    this.newTableDataSource = new TableDataSource(this.tableData)
    console.log("this.newTableDataSource",this.newTableDataSource);
    
  }

  ngOnInit(): void {
    // console.log("this.tableData ngoninit", this.tableData);
    // const testtabledatasource = new TableDataSource(this.tableData);
    // console.log("testtabledatasource ngoninit", testtabledatasource);

    // console.log("this is ngOnIninit");

    // this.tableDataItems = new TableDataSource(this.tableData);
    // this.table.dataSource = new TableDataSource([]);
    // this.table.dataSource = new TableDataSource(this.tableData);
    console.log("this.tableDataItems NGONINIT", this.tableDataItems);
    // this.tableDataItems.sort = this.matSort;
    // this.tableDataItems.paginator = this.matPaginator;
    
    this.InitialzeColumns();
    // this.table.dataSource = this.tableDataItems;
  }

  // we need this, in order to make pagination work with *ngIf
  ngAfterViewInit() {
    this.newTableDataSource.paginator = this.matPaginator;
    this.newTableDataSource.sort = this.matSort;
    // this.table.dataSource = this.tableDataItems;

    ///https://stackoverflow.com/questions/62710052/mat-sort-ascending-with-null-values-to-last
    ///For moving null values always to the bottom
  }

  getSortingOrder = (order, a, b) => {
    const sorted = order === "asc" ? [a, b] : [b, a];
    return sorted;
  };

  prindData() {
    console.log(this.tableDataItems);
    // console.log(this.table);
  }

  // edit(element: any) {
  //   this.actionEdit.emit(element);
  // }

  delete(element) {
    console.log(element);

    let data: any = this.tableDataItems.DATA$.value.filter(
      (el) => el != element
    );
    this.tableDataItems.DATA$.next(data);
    this.tableDataItems.paginator = this.matPaginator;
    if (this.matPaginator.pageIndex >= this.matPaginator.getNumberOfPages()) {
      this.matPaginator.previousPage();
    }
  }

  // setTableDataSource(data: any[]) {
  //   this.tableDataItems.sort = this.matSort;
  //   this.table.dataSource = this.tableDataItems;
  //   console.log("this.tableDataItems", this.tableDataItems);
  // }

  clearFilters() {
    this.tableDataItems.filterChange$.next("");
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
      this.tableDataItems.filterChange$.next("");
      this.emptyFilters = true;
    } else {
      this.tableDataItems.filterChange$.next(JSON.stringify(this.filterInputs));
      this.emptyFilters = false;
    }
  }
  //https://stackoverflow.com/questions/48276404/filtering-specific-column-in-angular-material-table-in-angular-5/48400406?noredirect=1#comment84008277_48400406
  //Rui Marques's answer
  setupFilter(column: string) {
    console.log(column);

    return;
    this.tableDataItems.filterPredicate = (
      d: MatTableDataSource<any>,
      filter: string
    ) => {
      //console.log(column);
      //console.log(d.retailPrice.toString());
      if (d[column] != undefined || d[column] != null) {
        const textToSearch =
          (d[column].toString() && d[column].toString().toLowerCase()) || "";
        return textToSearch.indexOf(filter) !== -1;
      } else {
        //console.log("undefined");
      }
      //console.log(textToSearch.indexOf(filter) !== -1);
    };

    //this.tableDataSource.columnName = column;
  }

  applyFilter(event: Event, filter: string[]) {
    if (
      Object.keys(this.filterInputs).every(
        (input) => this.filterInputs[input] == ""
      )
    ) {
      this.tableDataItems.filterChange$.next("");
      this.emptyFilters = true;
    } else {
      this.tableDataItems.filterChange$.next(JSON.stringify(this.filterInputs));
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
    let numRows = this.tableDataItems.DATA$.value.length;
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
    this.selection.select(...this.tableDataItems.DATA$.value);
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
    const DeletionResult = this.tableDataItems.DATA$.value.filter(
      (item) => !this.selection.selected.includes(item)
    );
    this.tableDataItems.DATA$.next(DeletionResult);
    this.selection.clear();
    if (this.matPaginator.pageIndex >= this.matPaginator.getNumberOfPages()) {
      this.matPaginator.previousPage();
    }
  }

  // getPagedDataSource(data: any): MatTableDataSource<any> {
  //   //this.pagedData = new MatTableDataSource<any>(data);
  //   //this.pagedData.paginator = this.matPaginator;
  //   console.log(data);

  //   const startIndex = this.matPaginator.pageIndex * this.matPaginator.pageSize;
  //   if (data.length - startIndex < this.matPaginator.pageSize) {
  //     let diff = this.matPaginator.pageSize - (data.length - startIndex);
  //     for (let i = 0; i < diff; i++) {
  //       data.push(Object.create(null));
  //     }
  //   }
  //   data = data.data.splice(startIndex, this.matPaginator.pageSize);
  //   return data;
  // }

  openDialog(data: T) {
    this.displayDialog = this.dialog.open(DisplayModalComponent, {
      data: data,
      panelClass: "DisplayModal",
    });
  }

  AddRecord() {
    this.router.navigate(["./AddEdit", this.componentName], {
      relativeTo: this.actRout,
    });
  }

  edit(item: T) {
    this.router.navigate([`./`, item.id], {
      relativeTo: this.actRout,
    });
  }

  InitialzeColumns() {
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
        ];
      } else {
        this.displayedColumns = [...columnNames, "ActionColumn"];
      }
      //console.log(true);
    } else {
      this.displayedColumns = columnNames;
    }

    if (this.isFilterable) {
      this.displayedColumnFilters = this.tableColumns
        //.filter((column) => column.isFilterable)
        .map((column) => {
          if (!column.isFilterable) {
            this.isColumnFiltered = false;
            return column.dataKey + " notFiltered";
          }
          this.isColumnFiltered = true;
          return column.dataKey;
        });
      if (this.hasCheckboxColumn) {
        this.displayedColumnFilters = ["check", ...this.displayedColumnFilters];
      }

      if (this.hasActionColumn) {
        this.displayedColumnFilters.push("action");
      }
    } else {
      this.displayedColumnFilters = [];
    }
    console.log("tableColumns", this.tableColumns);
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
