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
import { DataPropertyGetterPipe } from "./components/table/data-property-getter/data-property-getter-pipe";
import { TesttableComponent } from "./testtable/testtable.component";
import { MatDialogModule } from "@angular/material/dialog";
import { DisplayModalComponent } from "./shared/modal/displayModal.component";
import { InvoicesComponent } from "./components/invoices/invoices.component";
import { ClientFormComponent } from './components/clients/client-form/client-form.component';
import { SaleDetailComponent } from './components/sale-detail/sale-detail.component';
import { AddEditModule } from "./shared/add-edit/add-edit.module";
import { AngularMaterialModule } from "./shared/angular-material/angular-material.module";

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
    //LoadingSpinnerComponent
  ],
  imports: [
    AppRoutingModule,
    HttpClientModule,
    AuthModule,
    AlertModule.forRoot(),
    RouterModule,
    AddEditModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
    
  ],
  exports: [MatTableModule, MatDialogModule, AngularMaterialModule],
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
