import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { tokenKey } from './auth.constant';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable()
export class AlwaysAuthGuard implements CanActivate {
  constructor(public jwtHelper: JwtHelperService) {}
  canActivate() {
    const token = localStorage.getItem(tokenKey);
    if (token && !this.jwtHelper.isTokenExpired(token)) {
      return true;
    }
    return false;
  }
}
