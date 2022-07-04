import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from '../app-routing.module';
import { ShareModule } from '../shares/share.module';

import { MenuComponent } from './menu/menu.component';
import { VideoItemComponent } from './video-item/video-item.component';

@NgModule({
  declarations: [MenuComponent, VideoItemComponent],
  imports: [CommonModule, ShareModule, AppRoutingModule],
  exports: [MenuComponent, VideoItemComponent],
  providers: [],
})
export class ComponentModule {}
