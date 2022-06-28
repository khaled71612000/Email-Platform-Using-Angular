import { Injectable } from '@angular/core';
import { CanLoad, Route,Router, UrlSegment, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import {  Observable } from 'rxjs';
import {take,skipWhile, skip,tap} from 'rxjs/operators'
import {AuthService} from './auth.service'
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanLoad {
  constructor(private authService:AuthService,private router:Router){}
  canLoad(
    route: Route,
    segments: UrlSegment[]): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.signedin$.pipe(
      // to protect naviagtion otherwise
      // we dont care if its not false or true
      skipWhile(value=> value==null),
      // take first value , if 2 take 2 values
      take(1),
      // if value is false so not authetencted kick to main
      tap((authenticated)=>{
        if(!authenticated){
          this.router.navigateByUrl('/')
        }
      })
    )
  }
}
