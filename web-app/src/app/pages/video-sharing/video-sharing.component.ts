import { BaseComponent } from 'src/app/shares/base-component';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tokenKey } from 'src/app/auth/auth.constant';
import { AuthService } from 'src/app/auth/auth.service';
import { VideoSharingService } from './video-sharing.service';

@Component({
  selector: 'app-video-sharing',
  templateUrl: './video-sharing.component.html',
  styleUrls: ['./video-sharing.component.scss'],
})
export class VideoSharingComponent extends BaseComponent implements OnInit {
  sharingForm: FormGroup;
  errorMsg!: string;
  successMsg!: string;
  constructor(
    private fb: FormBuilder,
    private videoSharingService: VideoSharingService,
    private router: Router,
    private authService: AuthService
  ) {
    super();
    this.sharingForm = this.fb.group({
      url: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {}

  onShare() {
    if (this.sharingForm.invalid) {
      this.errorMsg = '';
      this.sharingForm.markAllAsTouched();
      return;
    }
    this.subscribe(
      this.videoSharingService.share(this.sharingForm.value),
      (res) => {
        this.errorMsg = '';
        this.successMsg = res.message;
        this.sharingForm.reset();
      },
      (error) => {
        this.errorMsg = error.error.error || error.error.message;
      }
    );
  }

  get url() {
    return this.sharingForm.get('url');
  }
}
