import { Injectable } from "@angular/core";
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  UrlTree,
  Router
} from "@angular/router";
import { Observable } from "rxjs";
import { AuthService } from "./auth.service";
import { map, tap, take } from "rxjs/operators";

@Injectable({
  providedIn: "root" 
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    rout: ActivatedRouteSnapshot,
    router: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Promise<boolean | UrlTree>
    | Observable<boolean | UrlTree> {
      let url :string = this.router.url;
      
    return this.authService.user.pipe(
      take(1),
      map(user => {
        const isAuth = !!user;
        this.authService.redirectURL = url;
        if (isAuth) {
          // console.log(url);
          return true;
        }
        // return this.router.createUrlTree(["/login"], { queryParams: { returnUrl: router.url }});
        return true;
      })
    );
  }
}
