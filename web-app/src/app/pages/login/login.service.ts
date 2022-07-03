import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shares/api.service';
import { BaseBackendService } from 'src/app/shares/base-backend.service';
import { LoginRequest, LoginResponse } from './model/login.model';

@Injectable()
export class LoginService extends BaseBackendService {
  constructor(apiService: ApiService) {
    super(apiService);
  }

  login(request: LoginRequest) {
    return this.post<LoginRequest, LoginResponse>('/user/login', request);
  }
}
