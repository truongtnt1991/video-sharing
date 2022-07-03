import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MenuComponent } from './menu/menu.component';

@NgModule({
  declarations: [MenuComponent],
  imports: [CommonModule],
  exports: [MenuComponent],
  providers: [],
})
export class ComponentModule {}
