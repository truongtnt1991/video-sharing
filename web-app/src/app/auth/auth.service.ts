import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Video } from '../pages/common-models/common.models';
import { ApiService } from '../shares/api.service';
import { tokenKey } from './auth.constant';
import { User } from './user.model';

@Injectable()
export class AuthService {
  getUserInfo(): User | undefined {
    const helper = new JwtHelperService();
    const token = localStorage.getItem(tokenKey);
    if (token) {
      const user = helper.decodeToken(token) as User;
      return user;
    }
    return undefined;
  }
}
