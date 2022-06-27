import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { TesttableDataSource } from "./testtable-datasource";

@Component({
  selector: "app-testtable",
  templateUrl: "./testtable.component.html",
  styleUrls: ["./testtable.component.scss"],
})
export class TesttableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild(MatTable) table: MatTable<any>;
  dataSource: TesttableDataSource;
  @Input() set data(data: any[]) {
    this.setdatatabletest(data);
  }
  testpaginator = true;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ["id", "name"];

  
  constructor(private cdr: ChangeDetectorRef) {
    
  }


  ngOnInit() {
    //this.dataSource = new TesttableDataSource(this.data);

    // console.log(this.dataSource);
  }

  setdatatabletest(data) {
    this.dataSource = new TesttableDataSource(data);
  }
   
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.table.dataSource = this.dataSource;
  }

  delete(row){
    // this.dataSource.data.indexOf(row);
    // let newdata: TesttableDataSource;
    // newdata.data = this.dataSource.data.filter((data) => data != row);
    // newdata.paginator = this.paginator
    // newdata.sort = this.sort;
      this.dataSource.data = this.dataSource.data.filter((data) => data != row);
    this.table.dataSource = this.dataSource.data.filter((data) => data != row);
     this.table.renderRows();
    this.cdr.detectChanges();
    console.log(this.table);
    
  }
}
