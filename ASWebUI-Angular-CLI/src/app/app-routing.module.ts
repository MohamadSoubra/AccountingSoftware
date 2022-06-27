import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/components/login/login.component";
import { ProductsComponent } from "./components/products/products.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { SuppliersComponent } from "./components/suppliers/suppliers.component";
import { InvoicesComponent } from "./components/invoices/invoices.component";
import { AddEditComponent } from "./Shared/add-edit/add-edit.component";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  { path: "products", component: ProductsComponent, canActivate: [AuthGuard] },
  { path: "clients", component: ClientsComponent, canActivate: [AuthGuard] },
  {
    path: "suppliers",
    component: SuppliersComponent,
    canActivate: [AuthGuard],
  },
  { path: "invoices", component: InvoicesComponent, canActivate: [AuthGuard],},
  {path: "AddEdit", component: AddEditComponent}
];
 
@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false}), AuthModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
