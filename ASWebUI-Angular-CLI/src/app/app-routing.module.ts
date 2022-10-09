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
  // {
  //   path: "invoices",
  //   canActivate: [AuthGuard],
  //   loadChildren: () => import('./features/invoice/invoice-routing.module').then(mod => mod.InvoiceRoutingModule),
  // },
  {
    path: "invoices",
    component: InvoiceComponent,
    // canActivate: [AuthGuard],
    // loadChildren: () => import('./features/invoice/invoice.module').then(mod => mod.InvoiceModule),
  },
  {
    path: "addEdit",
    // canActivate: [AuthGuard],
    loadChildren: () => import('./sharedFeatures/add-edit/add-edit.module').then(mod => mod.AddEditModule),
  },
  
  // { path: "AddEdit/:id", component: AddEditComponent },
];
 
@NgModule({
  // imports: [RouterModule.forRoot(routes, {enableTracing: true}), AuthModule],
  imports: [RouterModule.forRoot(routes, {enableTracing: false}), AddEditModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
