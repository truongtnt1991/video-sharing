import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AlwaysAuthGuard } from '../auth/always-auth-guard ';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { VideoSharedComponent } from './video-shared/video-shared.component';
import { VideoSharingComponent } from './video-sharing/video-sharing.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'video-sharing',
    component: VideoSharingComponent,
    canActivate: [AlwaysAuthGuard],
  },
  {
    path: 'video-shared',
    component: VideoSharedComponent,
    canActivate: [AlwaysAuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class PagesRoutingModule {}
