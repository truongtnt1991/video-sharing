import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shares/api.service';
import { BaseBackendService } from 'src/app/shares/base-backend.service';
import { Video } from '../common-models/common.models';

@Injectable()
export class DashboardService extends BaseBackendService {
  constructor(apiService: ApiService) {
    super(apiService);
  }

  getVideoSharing() {
    return this.get<Video[]>('/video/getAll');
  }
}
