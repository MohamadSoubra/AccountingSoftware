import { Injectable, Injector } from "@angular/core";
import {
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
  HttpHandler,
  HttpEvent,
  HttpErrorResponse,
} from "@angular/common/http";
import { AuthService } from "./auth.service";
import {
  catchError,
  take,
  exhaustMap,
  tap,
  switchMap,
  filter,
} from "rxjs/operators";
import { throwError } from "rxjs";
import { User } from "../models/User.model";

@Injectable({
  providedIn: "root",
})
export class TokenInterceptorService implements HttpInterceptor {
  
  constructor(private authService: AuthService) {}

  isRefreshing = false;

  intercept(request: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user) => {
        if (!user) {
          console.log("no User");
          return next.handle(request);
        }
        console.log("User from token interceptor", user);

        // let modifiedReq = request.clone({
        //   setHeaders: {
        //     Authorization: `Bearer ${user.token}`,
        //   },
        //   withCredentials: true,
        // });

        return next.handle(this.addToken(request, user.token)).pipe(
          catchError((error) => {
            console.log(error);

            if (error instanceof HttpErrorResponse && error.status === 0) {
              console.log("Error Status 0 Unknown Error");

              return throwError("status 0 Unknown Error");
            } else if (
              error instanceof HttpErrorResponse &&
              error.status === 401
            ) {
              return this.handle401Error(request, next); //https://angular-academy.com/angular-jwt/
            } else {
              return throwError(error);
            }
          })
        );
      })
    );
    // if(authService.getJwtToken()){
    //   request = this.addToken(request, authService.getJwtToken())
    // }
    //   return next.handle(request).pipe(catchError(error => {
    //     if(error instanceof HttpResponse && error.status === 401){
    //       return "handle 401 Error"//this.handle401Error(request, next); https://angular-academy.com/angular-jwt/
    //     }else{
    //       return throwError(error);
    //     }
    //   }));
  }

  private addToken(request: HttpRequest<any>, token: string) {
    return request.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });
  }

  handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      let user = this.authService.user.value;
      //this.authService.user.next(user);
      return this.authService.refreshToken({ token: user.token }).pipe(
        switchMap((tokens) => {
          //this.refreshTokenSubject.next(token.jwt);
          const newuser = new User(user.email, tokens.token);
          this.authService.user.next(newuser);
          this.isRefreshing = false;
          return next.handle(this.addToken(request, tokens.token));
        }),
        catchError((error) => {
          console.log(error);
          console.log(`error status is ${error.status}`);
          
          if (error.status === 400 || error.status === 401) {
            this.authService.logout();
          }
          return throwError(
            "Refresh token has expired you have to login again"
          );
        })
      );
    } else {
      return this.authService.user.pipe(
        filter((user) => user != null),
        take(1),
        switchMap((user) => {
          return next.handle(this.addToken(request, user.token));
        })
      );
    }
  }
}
