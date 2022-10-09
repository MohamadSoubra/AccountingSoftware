import {
  Component,
  OnInit,
  AfterContentInit,
  AfterViewInit,
} from "@angular/core";
import { ApiHelperService } from "src/app/services/ApiHelper.service";
import { User } from "src/app/models/User.model";
import { authUser } from "src/app/models/authUser.model";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { HomeComponent } from "src/app/Components/home/home.component";
import { AuthService } from "../../auth.service";
 
//declare var $:JQueryStatic;

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.scss"],
})
export class LoginComponent implements OnInit {
  //Users: User;
  user: authUser;
  error: string = null;
  isloading = false;
  email: string;
  password: string;
  returnUrl: string;
  //loggedin = false;
  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}
  //declare var $:any;

  ngOnInit(): void {
    //this.user.username = "mhmd@email.com",
    //this.user.password = "pwd12345."
    //this.http.getUsers().subscribe(users => console.log(users));
    //this.apihelper.getProducts().subscribe(producs=>{
    // console.log(producs);
    // });
    this.returnUrl = this.route.snapshot.queryParams["returnUrl"] || "/";
  }

  checktoken() {
    console.log(this.authService.isTokenValid(localStorage.getItem("token")));
  }

  login() {
    //this.user.username = "mhmd@email.com";
    //this.user.password = "Pwd12345.";
    //this.authService.loginUser(this.user).subscribe(token => console.log(token));
    console.log("Submitted");
  }

  onSubmit(form: NgForm) {
    //this.user = form.value
    //console.log(this.user);
    //console.log(form);
    if (!form.valid) {
      return;
    }
    this.isloading = true;
    this.authService.loginUser(form.value.email, form.value.password).subscribe(
      (loggedin) => {
        if (loggedin) {
          form.resetForm();
          this.router.navigate([this.returnUrl]);
          console.log("Loggedin");
          this.error = null;
          this.isloading = false;
          //this.loggedin = true ;
        }
      },
      (errorMessage) => {
        console.log(errorMessage);
        this.error = errorMessage;
        this.isloading = false;
        //this.loggedin = false;
      }
    );
  }
}
