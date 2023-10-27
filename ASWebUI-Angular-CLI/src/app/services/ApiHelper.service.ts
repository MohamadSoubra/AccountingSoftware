import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { catchError, tap, mapTo, map, exhaustMap, take } from "rxjs/operators";
import { throwError, of, Observable, BehaviorSubject } from "rxjs";
import { Product } from "../models/product.model";
import { AuthService } from "../auth/auth.service";
import { Client } from "../models/client.model";
import { Invoice } from "../models/invoice.model";
import { Supplier } from "../models/supplier.model";
import { SaleDetail } from "../models/sale-detail.model";
import { Identification } from "../models/Identification.interface";

@Injectable({
  providedIn: "root",
})

export class ApiHelperService<T> {
  rootUrl: string = "https://localhost/AccountingSoftwareApi";
  objectbyId: any;
  // Data$: BehaviorSubject<Product[]|Client[]|Supplier[]|Invoice[]>;
  Data$: BehaviorSubject<T[]>;
  recsType :string;
  recID: number;

  constructor(private http: HttpClient, private authService: AuthService) {
    
  }




  getProducts(): Observable<T[]> {
    // return this.ParseJSONArray(this.fakeProducts);

    return this.http.get<T[]>(`${this.rootUrl}/api/product`).pipe(
      map((products: T[]) => {
        return products
      }),
      catchError((error) => {
        console.log("error from api helper");
        console.log(error);
        return throwError(error);
      })
    );

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

  getClients() : void {
  // getClients() : Observable<Client[]> {
    // return this.ParseJSONArray(this.fakeClients);

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

    // return this.http.get<Client[]>(`${this.rootUrl}/api/client`)
    this.http.get<T[]>(`${this.rootUrl}/api/client`).pipe(
      map((clients: T[]) => {
        this.Data$.next(clients);
      }),
      catchError((error) => {
        console.log("error from api helper");
        console.log(error);
        return throwError(error);
      })
    );
  }

  getInvoices<T>(): Observable<T[]> {
  // getInvoices(): Observable<Invoice[]> {

    // return this.ParseJSONArray(this.fakeInvoices);
    // return this.fakeInvoices;

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

    const res = this.http.get<T[]>(`${this.rootUrl}/api/invoice`)
    console.log(" getInvoices result", res);
    return res;

    // return this.http.get<Invoice[]>(`${this.rootUrl}/api/invoice`).pipe(
    //   map((invoices: Invoice[]) => {
    //     // this.Data$.next(invoices);
    //   }),
    //   catchError((error) => {
    //     console.log("error from api helper");
    //     console.log(error);
    //     return throwError(error);
    //   })
    // );
    // return this.http.get<T[]>(`${this.rootUrl}/api/invoice`);
    // return of();

    
  }


  saveInvoice(invoice: Invoice<T>){
    return
    // let invoiceToUpdate = this.fakeInvoices.find(inv => inv.id === invoice.id)
    // this.update(invoiceToUpdate, invoice);
  }
  saveProduct(product : Product){
    return
    // let productToUpdate = this.fakeProducts.find(inv => inv.id === product.id)
    // this.update(productToUpdate, product);
  }
  saveClient(client : Client){
    return
    // let clientToUpdate = this.fakeClients.find(inv => inv.id === client.id)
    // this.update(clientToUpdate, client);
  }
  saveSupplier(supplier : Supplier){
    return
    // let supplierToUpdate = this.fakeSuppliers.find(inv => inv.id === supplier.id)
    // this.update(supplierToUpdate, supplier);
  }

  saveSaleDetails(SaleDetail: SaleDetail[]) {
    return this.http.post<SaleDetail[]>(`${this.rootUrl}/api/Sale`, SaleDetail)
  }

  saveRecord(object: any) {
    // let invoiceToUpdate = this.fakeInvoices.find(inv => inv.id === invoice.id)
    // this.update(invoiceToUpdate, object);
    console.log(object);
    
    console.log("object.constructor.name", object.constructor.name);
    switch (object.constructor.name) {
      case "Product":
        console.log("Product");
        this.saveProduct(object);
        break;
        case "Client":
        console.log("Client");
        this.saveClient(object);
        break;
        case "Supplier":
        this.saveSupplier(object);
        console.log("Supplier");
        break;
        case "Invoice":
        this.saveInvoice(object);
        console.log("Invoice");
        break;
      default:
        {
          console.log("default");
        }
        break;
    }

  }

  // getRecords(object: any): Observable<Product[] | Client[] | Supplier[] | Invoice[]> {
  getRecords<T>(type:string, invoiceID : number = 0): Observable<T[]> {
    // let invoiceToUpdate = this.fakeInvoices.find(inv => inv.id === invoice.id)
    // this.update(invoiceToUpdate, object);
    console.log(type);

    // console.log("object.constructor.name", object.constructor.name);
    switch (type) {
      case "Product":
        console.log("getRecords Product");
        // return this.getProducts();
        break;
      case "Client":
        console.log("getRecords Client");
        this.getClients();
        break;
      case "Supplier":
        console.log("getRecords Supplier");
         this.getSuppliers();
        break;
      case "Invoice":
        console.log("getRecords Invoice");
        return this.getInvoices<T>();
        break;
      case "Saledetail":
        console.log("getRecords Saledetail");
        return this.getSaleDetailsByInvoiceID<T>(invoiceID);
        break;
      default:
        {
          console.log("default");
        }
        break;
    }

  }

  deleteInvoice(invoice : Invoice<T>){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      body: invoice.id,
    };
    return this.http.delete(`${this.rootUrl}/api/invoice/DeleteInvoice/`, httpOptions).subscribe();
  }

  deleteSaleDetail(saleDetail: SaleDetail){
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      body: [`${saleDetail.id}`],
    };
    return this.http.delete(`${this.rootUrl}/api/invoice/DeleteSaleDetail/`, httpOptions).subscribe();
  }

  deleteProduct(product : Product){
    //Modify so that the body of http options is array of product Ids
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
      body: [product.id],
    };
    return this.http.delete(`${this.rootUrl}/api/product`, httpOptions).subscribe();
  }
  deleteClient(client : Client){
    return
  }
  deleteSupplier(supplier : Supplier){
    return
  }

  deleteRecord(object: any, type) {
    console.log(object);
    
    console.log("object.constructor.name", object.constructor.name);
    switch (type) {
      case "Product":
        console.log(`Product ${object.id} will be Deleted`);
        this.deleteProduct(object);
        break;
        case "Client":
        console.log(`Client ${object.id} will be Deleted`);
          this.deleteClient(object);
        break;
        case "Supplier":
        console.log(`Supplier ${object.id} will be Deleted`);
          this.deleteSupplier(object);
        break;
        case "Invoice":
        console.log(`Invoice ${object.id} will be Deleted`);
          this.deleteInvoice(object);
        break;
        case "SaleDetail":
        console.log(`SaleDetail ${object.id} will be Deleted`);
          this.deleteSaleDetail(object);
        break;
      default:
        {
          console.log("default");
        }
        break;
    }

  }

  getSaleDetailsByInvoiceID<T>(ID){
    let params = new HttpParams({});
    params = params.append("InvoiceId", ID);

    let res = this.http.get<T[]>(`${this.rootUrl}/api/invoice/GetInvoiceSaleDetails`, { params });
    console.log("getSaleDetailsByInvoiceID reslt",res);
    
    return res;
    // return this.http.get(`${this.rootUrl}/api/invoice/GetInvoiceSaleDetails`, { params }).pipe(
    //   map((saleDetails: SaleDetail[]) => {
    //     // console.log("invoice get by id",invoice);
    //     return saleDetails;
    //   }),
    //   catchError((error) => {
    //     console.log("error from api helper");

    //     console.log(error);

    //     return throwError(error);
    //   })
    // );
  }

  getSuppliers(): Observable<Supplier[]> {
    // console.log("this.ParseJSONArray(this.fakeSuppliers)",this.ParseJSONArray(this.fakeSuppliers));
    // return this.ParseJSONArray(this.fakeSuppliers);

    // return this.http.get(`${this.rootUrl}/api/supplier`).pipe(
    //   map((suppliers: Supplier[]) => {
    //     return suppliers;
    //   }),
    //   catchError((error) => {
    //     console.log("error from api helper");
    //     console.log(error);
    //     return throwError(error);
    //   })
    // );

    return this.http.get<Supplier[]>(`${this.rootUrl}/api/supplier`).pipe(
      map((suppliers: Supplier[]) => {
        return suppliers;
      }),
      catchError((error) => {
        console.log("error from api helper");
        console.log(error);
        return throwError(error);
      })
    );

    
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

  

  getInvoiceById(ID: any) {
    // const invoice: Invoice = new Invoice(this.fakeInvoices.find((invoice) => invoice.id === ID));
    // // console.log("invoice.constructor.name",invoice.constructor.name);
    // invoice.client = new Client (this.fakeClients.find(client => client.id === invoice.client.id));
    // // const cl24 = new Client({ id: "24" });
    // // invoice.client = new Client();
    // // invoice.client = cl24;
    // // console.log("invoice", invoice);
    // // console.log("invoice.client", invoice.client);
    // // console.log("Object.values(invoice)", Object.values(invoice));
    // // console.log("cl24", cl24);
    // return invoice;
    
    let params = new HttpParams({});
    params = params.append("InvoiceId", ID);

    return this.http.get(`${this.rootUrl}/api/invoice/GetInvoiceById`, {params}).pipe(
      map((invoice: Invoice<T>) => {
        console.log("invoice get by id",invoice);
        return new Invoice(invoice)
      }),
      catchError((error) => {
        console.log("error from api helper");

        console.log(error);

        return throwError(error);
      })
    );
  }

  getProductById(ID: any){
    // const product: Product = new Product (this.fakeProducts.find((product) => product.id === ID));
    // // console.log("product.constructor.name",product.constructor.name);
    // return product;
    // return this.http.get(`${this.rootUrl}/api/GetProductById/${ID}`).pipe(
    //   map((product: Product) => {
    //     return product;
    //   }),
    //   catchError((error) => {
    //     console.log("error from api helper");

    //     console.log(error);

    //     return throwError(error);
    //   })
    // );
    let params = new HttpParams();
    params = params.append('ProductId', ID);
    return this.http.get<Product>(`${this.rootUrl}/api/product/getProductByID`, { params })
    .pipe(
      map((product: Product) =>  {
        return new Product(product);
      }),
      catchError((error) => {
        console.log("error from api helper");
        console.log(error);
        return throwError(error);
      }));
      // console.log("result after http get", result);
      // return result;
    // return this.http.get<Product>(`${this.rootUrl}/api/product/getProductByID`, {params}).pipe(take(1)).toPromise();
    // return this.objectbyId;
  
  } 

  getclientById(ID: any) {
    // const temp: Client = new Client (this.fakeClients.find((client) => client.id === ID));
    // // console.log("client.constructor.name", temp.constructor.name);
    // return temp;
    let params = new HttpParams();
    params = params.append('ClientId', ID);
    return this.http.get(`${this.rootUrl}/api/Client/getClientByID`,{params}).pipe(
      map((client: Client) => {
        return new Client(client);
      }),
      catchError((error) => {
        console.log("error from api helper");

        console.log(error);

        return throwError(error);
      })
    );
  }
  
  // getsupplierById(ID: any): Supplier {
  //   const supplier: Supplier = new Supplier (this.fakeSuppliers.find((supplier) => supplier.id === ID));
  //   // console.log("supplier.constructor.name",supplier.constructor.name);
  //   return supplier;
  // }

  // getSaleDetailById(ID){
  //   const saleDetail: SaleDetail = new SaleDetail (this.fakeSaleDetails.find((saleDetail) => saleDetail.id === ID));
  //   return saleDetail;
  // }

  //getToken(user:User){
  //  return this.http.post<any>(`${this.rootUrl}/token`, user)
  //}

  getByID<T>(object, ID){
    console.log("object getByID", object);
    // console.log("object.constructor.name", object.constructor.name);
    let result;
    switch (object) {
      case "products":
      result = this.getProductById(ID);
      break;
      case "clients":
      result = this.getclientById(ID);
      break;
      // case "suppliers":
      // object = this.getsupplierById(ID);
      // break;
      case "invoices":
      result = this.getInvoiceById(ID);
      break;
      // case "saleDetails":
      // object = this.getSaleDetailById(ID);
      // break;
      default:
      {
      }
      break;
    }
    
    return result;
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

  ParseJSONArray(jObjectArray){
    
   return jObjectArray.map(obj => {
      return this.ParseJSON(obj)
    })
  }

  ParseJSON(JSONObject){
    
    //JSON parse example
    return JSON.parse(JSON.stringify(JSONObject), function(k, v) { 
      // console.log(v);
      
      return (typeof v === "object" || isNaN(v)) || typeof v === "boolean" || isNaN(parseInt(v, 10)) ? v : parseInt(v, 10); 
    });
  }

  isOfType(obj1, obj2): boolean{
    let result = false;
    // console.log(obj1.constructor.name);
    // console.log(obj2.constructor.name);

    if (obj1.constructor.name === obj2.constructor.name){
      result = true;
    }
    
    Object.keys(obj1).forEach(key => {
      Object.keys(obj2).forEach(key2 =>{
        key === key2;
      })
      result = true;
    })
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
      case "saleDetails":
        object = new SaleDetail(object);
        break;
      default:
        {
        }
        break;
    }
    return object;
  }
}
