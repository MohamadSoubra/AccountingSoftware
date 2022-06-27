import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";

import { AlertModule } from "ngx-bootstrap/alert";


import { AuthModule } from "./auth/auth.module";
import { AuthService } from "./auth/auth.service";
import { AuthGuard } from "./auth/auth.guard";
import { TokenInterceptorService } from "./auth/token-interceptor.service";
import { ProductsComponent } from "./components/products/products.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { SuppliersComponent } from "./components/suppliers/suppliers.component";
import { RouterModule } from "@angular/router";
import { HeaderComponent } from "./components/header/header.component";
import { LoadingSpinnerComponent } from "./shared/loading-Spinner/loading-spoinner.component";
import { TableComponent } from "./components/table/table.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatTabsModule } from "@angular/material/tabs";
import { MatIconModule } from "@angular/material/icon";
import { DataPropertyGetterPipe } from "./components/table/data-property-getter/data-property-getter-pipe";
import { TesttableComponent } from "./testtable/testtable.component";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatDialogModule } from "@angular/material/dialog";
import { DisplayModalComponent } from "./shared/modal/displayModal.component";
import { MatSelectModule } from "@angular/material/select";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { InvoicesComponent } from "./components/invoices/invoices.component";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { ClientFormComponent } from './components/clients/client-form/client-form.component';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { AddEditComponent } from './Shared/add-edit/add-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ProductsComponent,
    ClientsComponent,
    SuppliersComponent,
    HeaderComponent,
    TableComponent,
    DataPropertyGetterPipe,
    TesttableComponent,
    DisplayModalComponent,
    InvoicesComponent,
    ClientFormComponent,
    SaleDetailComponent,
    AddEditComponent,
    //LoadingSpinnerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    AlertModule.forRoot(),
    RouterModule,
    BrowserAnimationsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatTabsModule,
    MatIconModule,
    MatToolbarModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatCheckboxModule,
    MatAutocompleteModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [MatTableModule, MatDialogModule],
  providers: [
    AuthService,
    AuthGuard,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi: true,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
