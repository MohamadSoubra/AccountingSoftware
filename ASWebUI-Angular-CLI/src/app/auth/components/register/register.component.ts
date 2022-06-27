import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  email:string;
  password:string;
  confirmPassword:string 

  constructor() { }

  ngOnInit() {
  }

  onSubmit(f){
    console.log("submitted");
    
  }

}
