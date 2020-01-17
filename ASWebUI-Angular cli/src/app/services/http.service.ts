import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  rootUrl: string = "https://localhost:44379"

  constructor(private http:HttpClient) { }

  getProducts(){
    return this.http.get(`${this.rootUrl}/api/product`).pipe(
      catchError(() => throwError('User not found'))
    );
  }
}
