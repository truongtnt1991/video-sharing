import { Injectable } from '@angular/core';
import { ApiService } from 'src/app/shares/api.service';
import { BaseBackendService } from 'src/app/shares/base-backend.service';
import { VideoSharingRequest, VoteRequest } from './model/video-sharing.model';

@Injectable()
export class VideoSharingService extends BaseBackendService {
  constructor(apiService: ApiService) {
    super(apiService);
  }

  share(request: VideoSharingRequest) {
    return this.post<VideoSharingRequest, any>('/video/share', request);
  }

  like(request: VoteRequest) {
    return this.post<VoteRequest, any>('/vote/like', request);
  }

  dislike(request: VoteRequest) {
    return this.post<VoteRequest, any>('/vote/dislike', request);
  }
}
