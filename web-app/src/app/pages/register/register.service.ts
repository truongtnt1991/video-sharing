import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shares/api.service';
import { BaseBackendService } from 'src/app/shares/base-backend.service';
import { RegisterRequest } from './model/register.model';

@Injectable()
export class RegisterService extends BaseBackendService {
  constructor(apiService: ApiService) {
    super(apiService);
  }

  register(request: RegisterRequest) {
    return this.post<RegisterRequest, any>('/user/register', request);
  }
}
