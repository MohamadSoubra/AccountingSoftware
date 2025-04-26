import { Component, OnInit, ViewChild } from '@angular/core';
import { Role } from '../../Models/Role.model';
import { AuthService } from '../../auth.service';
import { User } from '../../Models/User.model';
import { AbstractControl, FormBuilder, FormGroup, NgForm, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { apiUser } from 'src/app/Models/apiUser.model';
import { authRequest } from '../../Models/auth-request.model';

const passwordMatchValidator = (control: AbstractControl) => {
  const password = control.get('password').value;
  const confirmPassword = control.get('confirmPassword').value;
  const currentErrors = control.get('confirmPassword').errors
  const confirmControl = control.get('confirmPassword')

  if (password !== confirmPassword && confirmPassword !== '') {
    confirmControl.setErrors({...currentErrors, passwordMismatch: true});
  } else {
    confirmControl.setErrors(currentErrors)
  }
}


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})



export class RegisterComponent<T> implements OnInit {
  // confirmPassword: string;
  // firstName: string;
  // lastName: string;
  // userName: string;
  // emailAddress: string;
  // password: string;
  passwordsMatch: boolean = true;
  userRoles: Role[] = [];
  rolesOptions: Role[] = [];
  passwordVisible:boolean = false;
  registrationForm = this.fb.group({
    firstName : [,],
    lastName : [,],
    userName : [,],
    emailAddress : [,[Validators.required, Validators.email]],
    password : [,[
      Validators.required,
      Validators.minLength(6),
      this.regexValidator(new RegExp(/(?=[0-9]).*$/), {'number': {}}),
      this.regexValidator(new RegExp(/(?=.*[a-z])(?=.*[A-Z]).*$/), {'case': {}}),
      this.regexValidator(new RegExp(/^\S*$/), {'space': {}}),
      this.regexValidator(new RegExp(/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?`]/), {'special': {}})
    ]],
    userRoles : [,],
    confirmPassword : [,[Validators.required]]
  },{validator : passwordMatchValidator});


  get emailAddress() { return this.registrationForm.get('emailAddress'); }
  get password() { return this.registrationForm.get('password'); }
  get confirmPassword() { return this.registrationForm.get('confirmPassword'); }

  constructor(private authService :AuthService<T>,private fb: FormBuilder) { }

  ngOnInit() {

    
    this.authService.GetRoles().subscribe(roles => {
      this.rolesOptions = roles;
    });
    
  }

  compareFn(role1: Role, role2: Role) {
    return role1 && role2 ? role1.name === role2.name : role1 === role2;
  }

  checkPasswords(){
    // console.log($event);
    // console.log(password);
    // this.confirmPassword = $event;
    // if(!password.control.touched){
    //   password.control.markAsUntouched();
    // }
    // if(this.password === this.confirmPassword){
    //   // console.log("true");
    //   this.passwordsMatch = true;
    // }else{
    //   // console.log("false");
    //   this.passwordsMatch = false;
    // }
    // const currentErrors = this.confirmPassword.errors
    // if (this.registrationForm.hasError('passwordMismatch'))
    //   this.confirmPassword.setErrors([{'passwordMismatch': true}]);
    // else
    //   this.confirmPassword.setErrors(currentErrors);

    
  }
  
  onSubmit(){
    console.log("this.confirmPassword",this.confirmPassword);
    const formValue = this.registrationForm.value;
    const newUser :authRequest = {
      id: formValue["id"],
      firstName : formValue["firstName"],
      lastName : formValue["lastName"],
      username : formValue["username"],
      emailAddress : formValue["emailAddress"],
      password : formValue["password"],
      roles : formValue["userRoles"]
    };

    // this.authService.RegisterUser(newUser)
    // console.log("formValue",formValue);
    console.log("this.registrationForm",this.registrationForm);
    // console.log("registrationForm",this.registrationForm);
    // console.log("newUser",newUser);

    // console.log(this.confirmPassword);
    
    this.authService.RegisterUser(newUser);
  }

  regexValidator(regex: RegExp, error: ValidationErrors): ValidatorFn{
    return (control: AbstractControl): {[key: string]: any} => {
      if (!control.value) {
        return null;
      }
      const valid = regex.test(control.value);
      
      return valid ? null : error;
    };
  }

}
