import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { catchError, tap, mapTo, map, exhaustMap, take } from "rxjs/operators";
import { throwError, of } from "rxjs";
import { Product } from "../Models/product.model";
import { AuthService } from "../auth/auth.service";
import { Client } from "../Models/client.model";
import { Invoice } from "../Models/invoice.model";
import { Supplier } from "../Models/supplier.model";

@Injectable({
  providedIn: "root",
})
export class ApiHelperService {
  rootUrl: string = "https://localhost/AccountingSoftwareApi";

  constructor(private http: HttpClient, private authService: AuthService) {}

  fakeProducts = [
    {
      id: "1",
      productName: "Product01",
      description:
        "Integer aliquam adipiscing lacus. Ut nec urna et arcu imperdiet",
      retailPrice: 1784,
      quantityInStock: 3477,
      isTaxable: false,
    },
    {
      id: "2",
      productName: "Product02",
      description:
        "posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse",
      retailPrice: 3147,
      quantityInStock: 3401,
      isTaxable: false,
    },
    {
      id: "3",
      productName: "Product03",
      description:
        "Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra.",
      retailPrice: 3759,
      quantityInStock: 267,
      isTaxable: false,
    },
    {
      id: "4",
      productName: "Product04",
      description:
        "in magna. Phasellus dolor elit, pellentesque a, facilisis non, bibendum",
      retailPrice: 334,
      quantityInStock: 211,
      isTaxable: false,
    },
    {
      id: "5",
      productName: "Product05",
      description:
        "a purus. Duis elementum, dui quis accumsan convallis, ante lectus",
      retailPrice: 1783,
      quantityInStock: 4685,
      isTaxable: false,
    },
    {
      id: "6",
      productName: "Product06",
      description:
        "ac mattis velit justo nec ante. Maecenas mi felis, adipiscing",
      retailPrice: 1093,
      quantityInStock: 933,
      isTaxable: true,
    },
    {
      id: "7",
      productName: "Product07",
      description:
        "magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.",
      retailPrice: 4125,
      quantityInStock: 3280,
      isTaxable: false,
    },
    {
      id: "8",
      productName: "Product08",
      description:
        "magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.",
      retailPrice: 4125,
      quantityInStock: 3280,
      isTaxable: false,
    },
    {
      id: "9",
      productName: "Product09",
      description:
        "magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.",
      retailPrice: 4125,
      quantityInStock: 3280,
      isTaxable: false,
    },
    {
      id: "10",
      productName: "Product10",
      description:
        "magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.",
      retailPrice: 4125,
      quantityInStock: 3280,
      isTaxable: false,
    },
    {
      id: "11",
      productName: "Product11",
      description:
        "magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.",
      retailPrice: 4125,
      quantityInStock: 3280,
      isTaxable: false,
    },
    {
      id: "12",
      productName: "Product12",
      description:
        "magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.",
      retailPrice: 4125,
      quantityInStock: 3280,
      isTaxable: false,
    },
    {
      id: "13",
      productName: "Product13",
      description:
        "magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.",
      retailPrice: 4125,
      quantityInStock: 3280,
      isTaxable: false,
    },
    {
      id: "14",
      productName: "Product14",
      description:
        "magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.",
      retailPrice: 4125,
      quantityInStock: 3280,
      isTaxable: false,
    },
    {
      id: "15",
      productName: "Product15",
      description:
        "magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.",
      retailPrice: 4125,
      quantityInStock: 3280,
      isTaxable: false,
    },
    {
      id: "16",
      productName: "Product16",
      description:
        "magnis dis parturient montes, nascetur ridiculus mus. Proin vel nisl.",
      retailPrice: 4125,
      quantityInStock: 3280,
      isTaxable: false,
    },
  ] as Product[];
  fakeClients = [
    {
      id: "1",
      firstName: "Wilie",
      lastName: "Tapley",
      emailAddress: "wtapley0@ucla.edu",
      address: null,
      phoneNumber: "218-285-9712",
    },
    {
      id: "2",
      firstName: "Bernhard",
      lastName: "Inderwick",
      emailAddress: "binderwick1@myspace.com",
      address: "41788 Lien Road",
      phoneNumber: "896-588-5259",
    },
    {
      id: "3",
      firstName: "Hewie",
      lastName: "Hulke",
      emailAddress: "hhulke2@techcrunch.com",
      address: "3019 Scofield Pass",
      phoneNumber: "711-612-0713",
    },
    {
      id: "4",
      firstName: "Phillida",
      lastName: "Mc Carrick",
      emailAddress: "pmccarrick3@clickbank.net",
      address: "4 Carey Parkway",
      phoneNumber: "232-833-9000",
    },
    {
      id: "5",
      firstName: "Zahara",
      lastName: "Blondel",
      emailAddress: "zblondel4@t-online.de",
      address: "0680 Johnson Trail",
      phoneNumber: "110-604-8462",
    },
    {
      id: "6",
      firstName: "Tally",
      lastName: "Durbyn",
      emailAddress: "tdurbyn5@livejournal.com",
      address: "66451 Oakridge Point",
      phoneNumber: "949-626-8202",
    },
    {
      id: "7",
      firstName: "Say",
      lastName: "Yanele",
      emailAddress: "syanele6@ask.com",
      address: "7510 Northridge Court",
      phoneNumber: "677-907-3034",
    },
    {
      id: "27",
      firstName: "Nicky",
      lastName: "Ockland",
      emailAddress: "nockland7@mediafire.com",
      address: "735 Petterle Point",
      phoneNumber: "739-620-1022",
    },
    {
      id: "8",
      firstName: "Waylan",
      lastName: "Standish",
      emailAddress: "wstandish8@phpbb.com",
      address: "1240 Texas Circle",
      phoneNumber: "630-164-7005",
    },
    {
      id: "9",
      firstName: "Diena",
      lastName: "Swales",
      emailAddress: "dswales9@cargocollective.com",
      address: "798 Quincy Circle",
      phoneNumber: "467-966-2349",
    },
    {
      id: "10",
      firstName: "Raimondo",
      lastName: "McKeating",
      emailAddress: null,
      address: "2 Judy Park",
      phoneNumber: "139-644-3130",
    },
    {
      id: "11",
      firstName: "Norah",
      lastName: "Currington",
      emailAddress: "ncurringtonb@wikimedia.org",
      address: "0 Briar Crest Hill",
      phoneNumber: "659-301-7575",
    },
    {
      id: "12",
      firstName: "Rod",
      lastName: "Holdron",
      emailAddress: "rholdronc@springer.com",
      address: "330 Hooker Way",
      phoneNumber: "632-916-1949",
    },
    {
      id: "13",
      firstName: "Edgardo",
      lastName: "Oxley",
      emailAddress: "eoxleyd@businessweek.com",
      address: "261 Browning Lane",
      phoneNumber: "801-332-9763",
    },
    {
      id: "14",
      firstName: "Mavis",
      lastName: "Fordyce",
      emailAddress: "mfordycee@abc.net.au",
      address: "182 Division Avenue",
      phoneNumber: "993-384-4197",
    },
    {
      id: "15",
      firstName: "Braden",
      lastName: "Swift",
      emailAddress: "bswiftf@umn.edu",
      address: "8508 Birchwood Avenue",
      phoneNumber: "606-560-4765",
    },
    {
      id: "16",
      firstName: "Simona",
      lastName: "Kareman",
      emailAddress: "skaremang@github.io",
      address: "2 Judy Place",
      phoneNumber: "962-695-5147",
    },
    {
      id: "17",
      firstName: "Wendel",
      lastName: "O'Hengerty",
      emailAddress: "wohengertyh@zdnet.com",
      address: "5171 Golf View Lane",
      phoneNumber: "348-294-1816",
    },
    {
      id: "18",
      firstName: "Natala",
      lastName: "Flatt",
      emailAddress: "nflatti@oakley.com",
      address: "2 Summer Ridge Avenue",
      phoneNumber: "533-779-2086",
    },
    {
      id: "19",
      firstName: "Harbert",
      lastName: "Wield",
      emailAddress: "hwieldj@ocn.ne.jp",
      address: "0 East Lane",
      phoneNumber: "607-198-0607",
    },
    {
      id: "20",
      firstName: "Lin",
      lastName: "Preon",
      emailAddress: "lpreonk@jugem.jp",
      address: "2 Redwing Hill",
      phoneNumber: "954-480-9919",
    },
    {
      id: "21",
      firstName: "Aura",
      lastName: "Butte",
      emailAddress: "abuttel@pagesperso-orange.fr",
      address: "27 Everett Circle",
      phoneNumber: "449-354-8877",
    },
    {
      id: "22",
      firstName: "Ursala",
      lastName: "Yanov",
      emailAddress: "uyanovm@omniture.com",
      address: "027 Brentwood Street",
      phoneNumber: "878-862-2503",
    },
    {
      id: "23",
      firstName: "Jeannine",
      lastName: "Lammerding",
      emailAddress: "jlammerdingn@xrea.com",
      address: "14 Sauthoff Terrace",
      phoneNumber: "811-710-6377",
    },
    {
      id: "24",
      firstName: "Henriette",
      lastName: "Giacomozzo",
      emailAddress: "hgiacomozzoo@about.me",
      address: "8 8th Trail",
      phoneNumber: "556-181-3773",
    },
    {
      id: "25",
      firstName: "Levi",
      lastName: "Moogan",
      emailAddress: "lmooganp@sogou.com",
      address: "20 Declaration Parkway",
      phoneNumber: "795-320-7170",
    },
    {
      id: "26",
      firstName: "12345678910",
      lastName: "12345678910lmooganp@sogou",
      emailAddress: "12345678910",
      address: "12345678910lmooganp@sogou",
      phoneNumber: "12345678910",
    },
  ] as Client[];
  fakeInvoices = [
    {
      id: "1",
      invoiceNumber: "QQI67RKH5HD",
      client: new Client( {id:"24"}),
      description:
        "This is a fake Invoice if you couldn't tell",
      invoiceDate: "2022-04-23 03:16:01",
      paymentDueDate: "2023-01-10 16:56:32",
      amountDue: 490,
      status: "Pending",
    },
    {
      id: "2",
      invoiceNumber: "HCE84CZB6DB",
      client: new Client( {id:"10"}),
      description: "odio a purus. Duis elementum,",
      invoiceDate: "2022-06-21 09:41:25",
      paymentDueDate: "2022-12-11 15:00:04",
      amountDue: 212,
      status: "Pending",
    },
    {
      id: "3",
      invoiceNumber: "MNM97JGN9RN",
      client: new Client( {id:"6"}),
      description:
        "adipiscing elit. Curabitur sed tortor. Integer aliquam adipiscing lacus. Ut nec urna",
      invoiceDate: "2021-07-18 09:43:33",
      paymentDueDate: "2021-05-25 21:37:16",
      amountDue: 46,
      status: "Paid",
    },
    {
      id: "4",
      invoiceNumber: "TQG64VSN6TI",
      client: new Client( {id:"3"}),
      description: "nec quam. Curabitur vel lectus.",
      invoiceDate: "2022-06-23 22:35:23",
      paymentDueDate: "2021-08-31 06:18:08",
      amountDue: 331,
      status: "Pending",
    },
    {
      id: "5",
      invoiceNumber: "BWI75KXO1KD",
      client: new Client( {id:"6"}),
      description:
        "non, egestas a, dui. Cras pellentesque. Sed dictum. Proin eget odio. Aliquam vulputate ullamcorper magna. Sed eu eros. Nam",
      invoiceDate: "2021-12-10 16:32:27",
      paymentDueDate: "2021-07-26 09:33:52",
      amountDue: 168,
      status: "Pending",
    },
    {
      id: "6",
      invoiceNumber: "MZR94WPY1QG",
      client: new Client( {id:"17"}),
      description:
        "Duis at lacus. Quisque purus sapien, gravida non, sollicitudin a, malesuada id, erat.",
      invoiceDate: "2022-10-03 21:48:32",
      paymentDueDate: "2021-08-16 04:46:05",
      amountDue: 850,
      status: "Paid",
    },
    {
      id: "7",
      invoiceNumber: "GQS04IUJ6HG",
      client: new Client( {id:"22"}),
      description: "",
      invoiceDate: "2022-04-10 16:36:21",
      paymentDueDate: "2021-03-25 07:01:35",
      amountDue: 914,
      status: "Paid",
    },
    {
      id: "8",
      invoiceNumber: "CNY78QLX6LB",
      client: new Client( {id:"13"}),
      description:
        "urna, nec luctus felis purus ac tellus. Suspendisse sed dolor. Fusce",
      invoiceDate: "2023-01-26 23:15:30",
      paymentDueDate: "2021-09-28 21:15:45",
      amountDue: 781,
      status: "Paid",
    },
    {
      id: "9",
      invoiceNumber: "TSE54WKL9SX",
      client: new Client( {id:"15"}),
      description:
        "Morbi neque tellus, imperdiet non, vestibulum nec, euismod in, dolor. Fusce feugiat.",
      invoiceDate: "2021-12-12 15:30:23",
      paymentDueDate: "2022-07-27 04:31:39",
      amountDue: 570,
      status: "Pending",
    },
    {
      id: "10",
      invoiceNumber: "CSR51QIW4DC",
      client: new Client( {id:"17"}),
      description:
        "risus. Morbi metus. Vivamus euismod urna. Nullam lobortis quam a felis ullamcorper viverra. Maecenas iaculis aliquet diam.",
      invoiceDate: "2022-11-13 12:40:00",
      paymentDueDate: "2023-02-18 10:23:31",
      amountDue: 758,
      status: "Paid",
    },
    {
      id: "11",
      invoiceNumber: "WPU58RNB3LU",
      client: new Client( {id:"18"}),
      description: "imperdiet non, vestibulum nec, euismod in, dolor. Fusce",
      invoiceDate: "2022-04-13 10:08:19",
      paymentDueDate: "2022-05-12 14:13:35",
      amountDue: 22,
      status: "Paid",
    },
    {
      id: "12",
      invoiceNumber: "JGZ35KJQ5BW",
      client: new Client( {id:"19"}),
      description:
        "mauris ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet nec, leo. Morbi neque tellus, imperdiet non, vestibulum",
      invoiceDate: "2021-05-06 12:23:15",
      paymentDueDate: "2021-12-29 22:20:09",
      amountDue: 974,
      status: "Paid",
    },
    {
      id: "13",
      invoiceNumber: "RLJ41KBI3YW",
      client: new Client( {id:"21"}),
      description: "enim nisl elementum",
      invoiceDate: "2022-09-05 11:51:02",
      paymentDueDate: "2022-02-07 06:05:07",
      amountDue: 590,
      status: "Pending",
    },
    {
      id: "14",
      invoiceNumber: "NJN27UMR1BA",
      client: new Client( {id:"20"}),
      description:
        "iaculis aliquet diam. Sed diam lorem, auctor quis, tristique ac, eleifend vitae, erat. Vivamus nisi. Mauris nulla.",
      invoiceDate: "2022-09-23 12:24:40",
      paymentDueDate: "2022-02-09 05:49:00",
      amountDue: 561,
      status: "Paid",
    },
    {
      id: "15",
      invoiceNumber: "AIL17UMU4QG",
      client: new Client( {id:"22"}),
      description:
        "faucibus. Morbi vehicula. Pellentesque tincidunt tempus risus. Donec egestas. Duis ac arcu.",
      invoiceDate: "2021-09-19 16:05:31",
      paymentDueDate: "2022-07-04 21:26:22",
      amountDue: 75,
      status: "Paid",
    },
    {
      id: "16",
      invoiceNumber: "QGH34SVC4HO",
      client: new Client( {id:"24"}),
      description: "sodales purus, in molestie tortor",
      invoiceDate: "2022-04-29 04:42:22",
      paymentDueDate: "2021-03-05 23:20:12",
      amountDue: 628,
      status: "Pending",
    },
    {
      id: "17",
      invoiceNumber: "KQM59JXW1XK",
      client: new Client( {id:"25"}),
      description: "a ultricies adipiscing, enim mi tempor lorem,",
      invoiceDate: "2022-06-02 03:44:02",
      paymentDueDate: "2021-07-23 01:13:54",
      amountDue: 738,
      status: "Pending",
    },
    {
      id: "18",
      invoiceNumber: "DWC60TNQ1RN",
      client: new Client( {id:"25"}),
      description:
        "orci. Phasellus dapibus quam quis diam. Pellentesque habitant morbi tristique senectus et netus et malesuada",
      invoiceDate: "2022-08-07 23:37:52",
      paymentDueDate: "2022-09-29 19:32:01",
      amountDue: 617,
      status: "Paid",
    },
    {
      id: "19",
      invoiceNumber: "BTK20KXS0DR",
      client: new Client( {id:"1"}),
      description:
        "sodales elit erat vitae risus. Duis a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque imperdiet,",
      invoiceDate: "2021-03-11 22:03:14",
      paymentDueDate: "2022-12-01 07:34:20",
      amountDue: 207,
      status: "Pending",
    },
    {
      id: "20",
      invoiceNumber: "JCD66DQT4LS",
      client: new Client( {id:"2"}),
      description: "adipiscing fringilla,",
      invoiceDate: "2021-08-09 11:05:38",
      paymentDueDate: "2022-07-04 18:24:02",
      amountDue: 504,
      status: "Paid",
    },
  ] as Invoice[] ;
  fakeSuppliers = [
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
  ] as Supplier[] ;

  getProducts() {
    return this.fakeProducts;
    // return this.http.get(`${this.rootUrl}/api/product`).pipe(
    //   map((products: Product[]) => {
    //     return products;
    //   }),
    //   catchError((error) => {
    //     console.log("error from api helper");
    //     console.log(error);
    //     return throwError(error);
    //   })
    // );

    /*
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        console.log("from api service");

        console.log(user);

        if (
          user == null ||
          (user == undefined && !this.authService.isTokenValid(user.token))
        ) {
          this.authService.redirecttoLogin();
        }

        if (!this.authService.isTokenValid(user.token)) {
          this.authService.refreshToken(user.token);
        }
        return this.http.get(`${this.rootUrl}/api/product`).pipe(
          tap((products: Product[]) => {
            return products;
          })
        );
      })
    );
    */
    // .subscribe(
    //   (products) => {
    //     console.log(products);
    //     return products;
    //   },
    //   (erorr) => {
    //     this.authService.testRefreshTokenforProducts();
    //   }
    // );
  }

  saveInvoice(invoice : Invoice){
    let invoiceToUpdate = this.fakeInvoices.find(inv => inv.id === invoice.id)
    this.update(invoiceToUpdate, invoice);
  }
  saveProduct(product : Product){
    let productToUpdate = this.fakeProducts.find(inv => inv.id === product.id)
    this.update(productToUpdate, product);
  }
  saveClient(client : Client){
    let clientToUpdate = this.fakeClients.find(inv => inv.id === client.id)
    this.update(clientToUpdate, client);
  }
  saveSupplier(supplier : Supplier){
    let supplierToUpdate = this.fakeSuppliers.find(inv => inv.id === supplier.id)
    this.update(supplierToUpdate, supplier);
  }

  saveRecord(object: any) {
    // let invoiceToUpdate = this.fakeInvoices.find(inv => inv.id === invoice.id)
    // this.update(invoiceToUpdate, object);
    console.log(object);
    
    console.log("object.constructor.name", object.constructor.name);
    switch (object.constructor.name) {
      case "Product":
        // object = new Product(object);
        console.log("Product");
        this.saveProduct(object);
        break;
        case "Client":
        console.log("Client");
        this.saveClient(object);
        // object = new Client(object);
        break;
        case "Supplier":
        this.saveSupplier(object);
        console.log("Supplier");
        // object = new Supplier(object);
        break;
        case "Invoice":
        this.saveInvoice(object);
        console.log("Invoice");
        // object = new Invoice(object);
        break;
      default:
        {
          console.log("default");
        }
        break;
    }

  }

  getSuppliers(): Supplier[] {
    return this.fakeSuppliers;
  }

  getClients(): Client[] {
    return this.fakeClients;

    // return this.http.get(`${this.rootUrl}/api/client`).pipe(
    //   map((clients: Client[]) => {
    //     return clients;
    //   }),
    //   catchError((error) => {
    //     console.log("error from api helper");

    //     console.log(error);

    //     return throwError(error);
    //   })
    // );
  }

  deleteProducts(products: any) {
    //Modify so that the body of http options is array of product Ids
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      body: products,
    };
    return this.http.delete(`${this.rootUrl}/api/product`, httpOptions);
  }

  login() {
    // return this.http.post<any>(`${this.rootUrl}/token`, user)
    // .pipe(
    //   tap(tokens => this.loginUser(user.username, tokens)),
    //   mapTo(true),
    //   catchError(error => {
    //     alert(error.error);
    //     return of(false);
    //   }));
  }

  getInvoices() {
    return this.fakeInvoices;
    // return this.http.get(`${this.rootUrl}/api/invoice`).pipe(
    //   map((invoices: Invoice[]) => {
    //     return invoices;
    //   }),
    //   catchError((error) => {
    //     console.log("error from api helper");

    //     console.log(error);

    //     return throwError(error);
    //   })
    // );
  }

  getInvoiceById(ID: any): Invoice {
    const invoice: Invoice = this.fakeInvoices.find((invoice) => invoice.id === ID);
    console.log("invoice.constructor.name",invoice.constructor.name);
    console.log(invoice);
    return invoice;
  }

  getProductById(ID: any): Product {
    const product: Product = new Product (this.fakeProducts.find((product) => product.id === ID));
    console.log("product.constructor.name",product.constructor.name);
    return product;
  }

  getclientById(ID: any): Client {
    const temp: Client = new Client (this.fakeClients.find((client) => client.id === ID));
    console.log("client.constructor.name", temp.constructor.name);
    return temp;
  }
  
  getsupplierById(ID: any): Supplier {
    const supplier: Supplier = new Supplier (this.fakeSuppliers.find((supplier) => supplier.id === ID));
    console.log("client.constructor.name",supplier.constructor.name);
    return supplier;
  }

  //getToken(user:User){
  //  return this.http.post<any>(`${this.rootUrl}/token`, user)
  //}

  getByID(object, ID){
    console.log("object getByID", object);
    console.log("object.constructor.name", object.constructor.name);
    
    switch (object) {
      case "products":
      object = this.getProductById(ID);
      break;
      case "clients":
      object = this.getclientById(ID);
      break;
      case "suppliers":
      object = this.getsupplierById(ID);
      break;
      case "invoices":
      object = this.getInvoiceById(ID);
      break;
      default:
      {
      }
      break;
    }
    return object;
  }


  loginUser(username: string) {}

  objectIsEmpty(object) {
    let emptyProperties;
    if (object) {
      emptyProperties = Object.keys(object)?.every(
        (prop) => prop?.length === 0 || prop === "" || prop === null
      );
    }

    if (
      !object ||
      (Object.keys(object)?.length === 0 && object.constructor === Object) ||
      emptyProperties ||
      JSON.stringify(object) === "{}"
    ) {
      return true;
    }

    return false;
  }

  update(targetObject, obj) {
    if (!targetObject || !obj){
      console.log("no target or object");
      
      return;
    }
    Object.keys(obj).forEach(key => {

      // delete property if set to undefined or null
      if (undefined === obj[key] || null === obj[key]) {
        // delete targetObject[key]
      }

      // property value is object, so recurse
      else if (
        'object' === typeof obj[key]
        && !Array.isArray(obj[key])
      ) {

        // target property not object, overwrite with empty object
        if (
          !('object' === typeof targetObject[key]
            && !Array.isArray(targetObject[key]))
        ) {
          targetObject[key] = {}
        }

        // recurse
        this.update(targetObject[key], obj[key])
      }

      // set target property to update property
      else {
        targetObject[key] = obj[key]
      }
    })
  }

  isOfType(obj1, obj2): boolean{
    let result = false;
    console.log(obj1.constructor.name);
    console.log(obj2.constructor.name);

    if (obj1.constructor.name === obj2.constructor.name){
      result = true;
    }
    
    // Object.keys(obj1).forEach(key => {
    //   Object.keys(obj2).forEach(key2 =>{
    //     key === key2;
    //   })
    //   result = true;
    // })
    return result
  }

  InitializeType(object?: any) {
     console.log("object", object);

    switch (object) {
      case "products":
        object = new Product(object);
        break;
      case "clients":
        object = new Client(object);
        break;
      case "suppliers":
        object = new Supplier(object);
        break;
      case "invoices":
        object = new Invoice(object);
        break;
      default:
        {
        }
        break;
    }
    return object;
  }
}
