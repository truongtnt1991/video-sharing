import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardService } from './dashboard/dashboard.service';
import { LoginComponent } from './login/login.component';
import { LoginService } from './login/login.service';
import { PagesRoutingModule } from './pages.routing.module';
import { RegisterComponent } from './register/register.component';
import { VideoSharingComponent } from './video-sharing/video-sharing.component';

@NgModule({
  declarations: [
    LoginComponent,
    DashboardComponent,
    RegisterComponent,
    VideoSharingComponent,
  ],
  imports: [BrowserModule, BrowserAnimationsModule, PagesRoutingModule],
  exports: [],
  providers: [LoginService, DashboardService],
})
export class PagesModule {}
