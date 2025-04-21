import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AuthGuard } from "./auth/auth.guard";
import { ProductsComponent } from "./components/products/products.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { SuppliersComponent } from "./components/suppliers/suppliers.component";
import { InvoiceComponent } from "./features/invoice/invoice.component";
import { AddEditModule } from "./sharedFeatures/add-edit/add-edit.module";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "Products",
    component: ProductsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "Clients",
    component: ClientsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "Suppliers",
    component: SuppliersComponent,
    canActivate: [AuthGuard],
  },
  {
    path: "SaleDetails",
    component: SuppliersComponent,
    canActivate: [AuthGuard],
  },
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule],
})
export class AppRoutingModule {}
