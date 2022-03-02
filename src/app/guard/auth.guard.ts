import { Injectable } from '@angular/core';
import {
  CanActivate, ActivatedRouteSnapshot,
  RouterStateSnapshot, UrlTree, Router
} from
  '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from
  '../service/token-storage.service';
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private tokenStorage
    : TokenStorageService) { }
  canActivate(next: ActivatedRouteSnapshot, state:
    RouterStateSnapshot): boolean {
    if (this.tokenStorage.getToken()) {
      // console.log("Token: " +
      //   this.tokenStorage.getToken())
      return true;
    }
    this.router.navigate(['/login']);
    return false;
  }
}