import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { fromEvent, debounceTime, distinctUntilChanged, tap } from 'rxjs';
import { BaseComponent } from 'src/app/shares/base-component';
import { accentsTidy } from 'src/app/shares/utils';
import { VideoItem } from '../common-models/common.models';
import { DashboardService } from './dashboard.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent extends BaseComponent implements OnInit {
  videos: VideoItem[] = [];
  videosFilter: VideoItem[] = [];
  @ViewChild('keywordsSearchBar') keywordsSearchBar?: ElementRef;

  constructor(private dashboardService: DashboardService) {
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
    this.subscribe(this.dashboardService.getVideoSharing(), (res) => {
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
