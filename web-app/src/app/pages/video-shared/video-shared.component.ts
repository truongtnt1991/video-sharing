import { BaseComponent } from 'src/app/shares/base-component';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { accentsTidy } from 'src/app/shares/utils';
import { VideoItem } from '../common-models/common.models';
import { DashboardService } from '../dashboard/dashboard.service';
import { VideoSharingService } from '../video-sharing/video-sharing.service';

@Component({
  selector: 'app-video-shared',
  templateUrl: './video-shared.component.html',
  styleUrls: ['./video-shared.component.scss'],
})
export class VideoSharedComponent extends BaseComponent implements OnInit {
  videos: VideoItem[] = [];
  videosFilter: VideoItem[] = [];
  @ViewChild('keywordsSearchBar') keywordsSearchBar?: ElementRef;

  constructor(
    private dashboardService: DashboardService,
    private videoSharingService: VideoSharingService
  ) {
    super();
  }

  ngOnInit(): void {
    this.getVideos();
  }

  ngAfterViewInit() {
    if (this.keywordsSearchBar) {
      this.subscribe(
        fromEvent<any>(this.keywordsSearchBar.nativeElement, 'keyup').pipe(
          debounceTime(200),
          distinctUntilChanged(),
          tap((event: any) => {
            this.filterVideos();
          })
        )
      );
    }
  }

  getVideos() {
    this.subscribe(this.dashboardService.getVideoShared(), (res) => {
      this.videos = [...res.videos];
      this.videosFilter = [...res.videos];
    });
  }

  private filterVideos() {
    this.videosFilter = this.videos.filter((video: VideoItem) =>
      accentsTidy(video.videoInfo.title.toLowerCase()).includes(
        accentsTidy(
          this.keywordsSearchBar?.nativeElement?.value?.toLowerCase() || ''
        )
      )
    );
  }
}
