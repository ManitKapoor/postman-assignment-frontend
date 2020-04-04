import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleGuardService implements CanActivate {
  constructor(private _authService: AuthService, private _router: Router) {
  }

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (!this._authService.hasTokenLoaded()) {
      this._router.navigate(['login']);
      return false;
    }
    const user =  this._authService.getUserDetails();
    if (user.role === next.data.role) {
      return true;
    }
    this._router.navigate(['/404']);
    return false;
  }
}
