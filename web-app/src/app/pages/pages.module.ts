import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthModule } from '../auth/auth.module';
import { ComponentModule } from '../components/components.module';
import { ShareModule } from '../shares/share.module';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { PagesRoutingModule } from './pages.routing.module';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { VideoSharedComponent } from './video-shared/video-shared.component';
import { VideoSharingComponent } from './video-sharing/video-sharing.component';
import { VideoSharingService } from './video-sharing/video-sharing.service';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    VideoSharingComponent,
    VideoSharedComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PagesRoutingModule,
    ShareModule,
    ComponentModule,
    FormsModule,
    ReactiveFormsModule,
    AuthModule,
  ],
  exports: [],
  providers: [
    LoginService,
    DashboardService,
    RegisterService,
    VideoSharingService,
  ],
})
export class PagesModule {}
