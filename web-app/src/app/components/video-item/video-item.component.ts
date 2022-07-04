import { BaseComponent } from 'src/app/shares/base-component';
import { Component, Input, OnInit } from '@angular/core';
import { VideoItem } from 'src/app/pages/common-models/common.models';
import { VideoSharingService } from 'src/app/pages/video-sharing/video-sharing.service';
import { tokenKey } from 'src/app/auth/auth.constant';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-video-item',
  templateUrl: './video-item.component.html',
  styleUrls: ['./video-item.component.scss'],
})
export class VideoItemComponent extends BaseComponent implements OnInit {
  @Input() video!: VideoItem;
  isLogin = !!localStorage.getItem(tokenKey);
  constructor(
    private videoSharingService: VideoSharingService,
    private authService: AuthService
  ) {
    super();
  }

  ngOnInit(): void {}

  onLike(videoId: number) {
    if (!this.isLogin) {
      return;
    }
    this.subscribe(
      this.videoSharingService.like({ videoId }),
      (res) => {
        const info = this.authService.getUserInfo();
        if (info) {
          const index = this.video.Votes.findIndex(
            (x) => x.type === 'LIKE' && x.userId === info.id
          );
          if (this.isLike()) {
            this.video.Votes.splice(index, 1);
          } else {
            this.video.Votes.push({
              id: 0,
              userId: info.id,
              type: 'LIKE',
            });
          }
        }
      },
      () => {}
    );
  }

  onDislike(videoId: number) {
    if (!this.isLogin) {
      return;
    }
    this.subscribe(
      this.videoSharingService.dislike({ videoId }),
      (res) => {
        const info = this.authService.getUserInfo();
        if (info) {
          const index = this.video.Votes.findIndex(
            (x) => x.type === 'DISLIKE' && x.userId === info.id
          );
          if (this.isDislike()) {
            this.video.Votes.splice(index, 1);
          } else {
            this.video.Votes.push({
              id: 0,
              userId: info.id,
              type: 'DISLIKE',
            });
          }
        }
      },
      () => {}
    );
  }

  totalLike() {
    return this.video.Votes.filter((x) => x.type === 'LIKE').length;
  }

  totalDislike() {
    return this.video.Votes.filter((x) => x.type === 'DISLIKE').length;
  }

  isLike() {
    const info = this.authService.getUserInfo();
    if (info) {
      return (
        this.video.Votes.findIndex(
          (x) => x.type === 'LIKE' && x.userId === info.id
        ) !== -1
      );
    }
    return false;
  }

  isDislike() {
    const info = this.authService.getUserInfo();
    if (info) {
      return (
        this.video.Votes.findIndex(
          (x) => x.type === 'DISLIKE' && x.userId === info.id
        ) !== -1
      );
    }
    return false;
  }
}
