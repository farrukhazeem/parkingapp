import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import {Router} from '@angular/router';
import { AuthService } from './shared/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  
  constructor (private auth: AuthService, private router: Router){

  }
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    this.router.navigate(['/']);
    console.log('your are not auth');
      return true;
  }
}
