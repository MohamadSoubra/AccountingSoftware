import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';
import { UsersManagerComponent } from './components/UsersManager/UsersManager.component';


const routes: Routes = [
  { path: 'Login', component: LoginComponent},
  { path: 'Register', component: RegisterComponent},
  { path: 'Reset Password', component: ResetPasswordComponent},
  { path: 'Users Manager', component: UsersManagerComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
