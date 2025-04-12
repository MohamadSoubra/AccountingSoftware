import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { AuthRoutingModule } from "./auth-routing.module";
import { LoginComponent } from "./components/login/login.component";
import { RegisterComponent } from "./components/register/register.component";
import { ResetPasswordComponent } from "./components/reset-password/reset-password.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule } from "@angular/router";
import { LoadingSpinnerComponent } from "../sharedFeatures/loading-Spinner/loading-spoinner.component";
import { AngularMaterialModule } from "../sharedFeatures/angular-material/angular-material.module";
import { UsersManagerComponent } from "./components/UsersManager/UsersManager.component";
import { TableModule } from "../sharedFeatures/table/table.module";

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    ResetPasswordComponent,
    LoadingSpinnerComponent,
    UsersManagerComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    RouterModule,
    AuthRoutingModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    TableModule

  ],
  exports: [LoginComponent, RegisterComponent, ResetPasswordComponent]
})
export class AuthModule {}
