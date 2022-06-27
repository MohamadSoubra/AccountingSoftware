import { Component, isDevMode, OnInit } from "@angular/core";
import { ApiHelperService } from "src/app/services/ApiHelper.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  //user: User = {username : " ", password : " "};
  data = [
    { id: 1, name: "Hydrogen" },
    { id: 2, name: "helium" },
    { id: 3, name: "Lithium" },
    { id: 4, name: "Beryllium" },
    { id: 5, name: "Boron" },
    { id: 6, name: "Carbon" },
    { id: 7, name: "Nitrogen" },
    { id: 8, name: "Oxygen" },
    { id: 9, name: "Fluorine" },
    { id: 10, name: "Neon" },
    { id: 11, name: "Sodium" },
    { id: 12, name: "Magnesium" },
    { id: 13, name: "Aluminum" },
    { id: 14, name: "silicon" },
    { id: 15, name: "Phosphorus" },
    { id: 16, name: "Sulfur" },
    { id: 17, name: "Chlorine" },
    { id: 18, name: "Argon" },
    { id: 19, name: "Potassium" },
    { id: 20, name: "Calcium" },
  ];

  constructor(private api: ApiHelperService) {}

  ngOnInit() {}
}
