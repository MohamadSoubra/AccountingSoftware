import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: "app-client-form",
  templateUrl: "./client-form.component.html",
  styleUrls: ["./client-form.component.scss"],
})
export class ClientFormComponent implements OnInit {
  constructor(private fb: FormBuilder) {}

  clientForm = this.fb.group({
    firstName: [""],
    lastName: [""],
    emailAddress: [""],
    phoneNumber: [""],
    address: [""],
  });
  ngOnInit(): void {}

  saveClient() {
    console.log("saveClient works");

    console.log(this.clientForm.value);
  }
}
