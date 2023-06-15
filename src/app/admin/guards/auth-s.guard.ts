import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { DataService } from '../services/data.service';
@Injectable({
  providedIn: 'root'
})
export class AuthSGuard implements CanActivate {
  constructor(private data : DataService , private router : Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      if(sessionStorage.getItem('user')){
        this.data.isLogin = true ;
        this.router.navigate(['/admin']);
        return false ;
      } else {
        this.data.isLogin = false ;
        return true ;
      }
  }

}
