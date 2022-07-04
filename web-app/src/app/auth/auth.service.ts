import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Video } from '../pages/common-models/common.models';
import { ApiService } from '../shares/api.service';
import { tokenKey } from './auth.constant';

@Injectable()
export class AuthService {
  getUserInfo() {
    const helper = new JwtHelperService();
    const token = localStorage.getItem(tokenKey);
    if (token) {
      const decodedToken = helper.decodeToken(token);
      return decodedToken;
    }
    return '';
  }
}
