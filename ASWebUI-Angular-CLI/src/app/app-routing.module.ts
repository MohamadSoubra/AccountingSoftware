import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./components/home/home.component";
import { AuthModule } from "./auth/auth.module";
import { AuthGuard } from "./auth/auth.guard";
import { LoginComponent } from "./auth/components/login/login.component";
import { ProductsComponent } from "./components/products/products.component";
import { ClientsComponent } from "./components/clients/clients.component";
import { SuppliersComponent } from "./components/suppliers/suppliers.component";
import { AddEditComponent } from "./Shared/add-edit/add-edit.component";
import { AddEditModule } from "./shared/add-edit/add-edit.module";

const routes: Routes = [
  { path: "", component: HomeComponent, canActivate: [AuthGuard] },
  {
    path: "products",
    component: ProductsComponent,
    canActivate: [AuthGuard],
    // ,children: [
    //   {path: "AddEdit", component: AddEditComponent},
    //   {path: "AddEdit/:id", component: AddEditComponent},
    // ]
  },
  {
    path: "clients",
    component: ClientsComponent,
    canActivate: [AuthGuard],
    // ,children: [
    //   {path: "AddEdit", component: AddEditComponent},
    //   {path: "AddEdit/:id", component: AddEditComponent},
    // ]
  },
  {
    path: "suppliers",
    component: SuppliersComponent,
    canActivate: [AuthGuard],
    // children:[
    //   {path: "AddEdit", component: AddEditComponent},
    //   {path: "AddEdit/:id", component: AddEditComponent},
    // ]
  },
  {
    path: "invoices",
    canActivate: [AuthGuard],
    loadChildren: () => import('./features/invoice/invoice-routing.module').then(mod => mod.InvoiceRoutingModule),
  },
  // { path: "AddEdit/:id", component: AddEditComponent },
];
 
@NgModule({
  // imports: [RouterModule.forRoot(routes, {enableTracing: true}), AuthModule],
  imports: [RouterModule.forRoot(routes, {enableTracing: true}), AddEditModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
