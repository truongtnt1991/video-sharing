import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VideoSharedComponent } from './video-shared.component';

describe('VideoSharedComponent', () => {
  let component: VideoSharedComponent;
  let fixture: ComponentFixture<VideoSharedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VideoSharedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VideoSharedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
