import { Component, OnInit } from '@angular/core';
import { Supplier } from 'src/app/Models/supplier.model';
import { ApiHelperService } from 'src/app/services/ApiHelper.service';

@Component({
  selector: "app-suppliers",
  templateUrl: "./suppliers.component.html",
  styleUrls: ["./suppliers.component.scss"],
})
export class SuppliersComponent implements OnInit {
  suppliersList: Supplier[];
  suppliersTableColumns: any = [
    {
      name: "Name",
      dataKey: "firstName",
      isSortable: true,
      isFilterable: true,
    },
    {
      name: "Last Name",
      dataKey: "lastName",
      isSortable: true,
      isFilterable: true,
    },
    {
      name: "Address",
      dataKey: "address",
      isSortable: true,
      isFilterable: true,
    },
    {
      name: "Email",
      dataKey: "emailAddress",
      isSortable: true,
      isFilterable: true,
    },
    {
      name: "Phone",
      dataKey: "phoneNumber",
      isFilterable: false,
    },
    {
      name: "Country",
      dataKey: "country",
      isFilterable: false,
    },
    {
      name: "City",
      dataKey: "city",
      isFilterable: false,
    },
  ];
  componentName: string = "Supplier";

  constructor(private api: ApiHelperService) {}

  ngOnInit() {
    this.suppliersList = this.api.getSuppliers();
  }

  getDummyClients() {
    return [
      {
        id: "1",
        firstName: "Hayden",
        lastName: "Hayes ",
        emailAddress:
          "dolor.tempus.non@aol.com dolor.tempus.non@aol.com dolor.tempus.non@aol.com dolor.tempus.non@aol.com dolor.tempus.non@aol.com dolor.tempus.non@aol.com ",
        phoneNumber: "(335) 679-7209",
        address:
          "694-2205 Amet Ave 694-2205 Amet Ave 694-2205 Amet Ave 694-2205 Amet Ave 694-2205 Amet Ave 694-2205 Amet Ave 694-2205 Amet Ave ",
        country: "Brazil",
        city: "Novosibirsk",
      },
      {
        id: "2",
        firstName: "Yoshio",
        lastName: "Huber",
        emailAddress: "dolor.dolor@protonmail.ca",
        phoneNumber: "(354) 185-4385",
        address: "303-3830 Nulla St.",
        country: "New Zealand",
        city: "Fort Smith",
      },
      {
        id: "3",
        firstName: "Brett",
        lastName: "Murphy",
        emailAddress: "dapibus.rutrum.justo@icloud.ca",
        phoneNumber: "(387) 548-7481",
        address: "Ap #701-7518 Dis St.",
        country: "Turkey",
        city: "Mérida",
      },
      {
        id: "4",
        firstName: "Lyle",
        lastName: "Parker",
        emailAddress: "elit@yahoo.ca",
        phoneNumber: "1-351-472-1750",
        address: "Ap #790-4525 Lobortis Rd.",
        country: "Sweden",
        city: "Yeosu",
      },
      {
        id: "5",
        firstName: "Amena",
        lastName: "Carr",
        emailAddress: "magna.a.neque@protonmail.net",
        phoneNumber: "1-115-272-3535",
        address: "P.O. Box 879, 1725 Lectus Road",
        country: "South Korea",
        city: "Hunan",
      },
      {
        id: "6",
        firstName: "Eve",
        lastName: "Harrison",
        emailAddress: "curabitur.egestas.nunc@outlook.org",
        phoneNumber: "1-697-862-9564",
        address: "348-4559 Arcu Rd.",
        country: "Poland",
        city: "Istanbul",
      },
      {
        id: "7",
        firstName: "Nelle",
        lastName: "Lynn",
        emailAddress: "amet.diam@hotmail.edu",
        phoneNumber: "(680) 228-7655",
        address: "343-6883 Gravida St.",
        country: "Brazil",
        city: "Germersheim",
      },
      {
        id: "8",
        firstName: "Kylie",
        lastName: "Miranda",
        emailAddress: "dolor.nonummy@outlook.edu",
        phoneNumber: "(714) 242-2917",
        address: "7473 Non, Street",
        country: "Germany",
        city: "Teruel",
      },
      {
        id: "9",
        firstName: "Britanney",
        lastName: "Mcguire",
        emailAddress: "curabitur.egestas@icloud.com",
        phoneNumber: "1-775-848-2212",
        address: "Ap #343-6240 Nec Road",
        country: "India",
        city: "Sibi",
      },
      {
        id: "10",
        firstName: "Timon",
        lastName: "Durham",
        emailAddress: "dui.nec@yahoo.com",
        phoneNumber: "(173) 437-4865",
        address: "Ap #770-8424 Rhoncus. St.",
        country: "United Kingdom",
        city: "Magadan",
      },
      {
        id: "11",
        firstName: "Branden",
        lastName: "Patrick",
        emailAddress: "dignissim.tempor.arcu@hotmail.net",
        phoneNumber: "1-449-474-7592",
        address: "Ap #672-7472 Nullam St.",
        country: "Australia",
        city: "Laren",
      },
      {
        id: "12",
        firstName: "Sandra",
        lastName: "Mcknight",
        emailAddress: "est.congue@hotmail.net",
        phoneNumber: "(840) 152-3521",
        address: "311-1522 Elit Ave",
        country: "Australia",
        city: "Huntly",
      },
      {
        id: "13",
        firstName: "Yen",
        lastName: "Ramsey",
        emailAddress: "mollis.nec.cursus@hotmail.org",
        phoneNumber: "1-237-843-0771",
        address: "379-8263 Orci Avenue",
        country: "Italy",
        city: "Siquirres",
      },
      {
        id: "14",
        firstName: "Oprah",
        lastName: "Mcgee",
        emailAddress: "tincidunt.dui.augue@yahoo.ca",
        phoneNumber: "1-673-137-8443",
        address: "403-3950 Nibh Avenue",
        country: "Canada",
        city: "Värnamo",
      },
      {
        id: "15",
        firstName: "Xenos",
        lastName: "Buck",
        emailAddress: "ullamcorper@icloud.couk",
        phoneNumber: "(563) 437-7618",
        address: "886-4573 Ligula. St.",
        country: "Netherlands",
        city: "Kielce",
      },
    ];
  }
}
