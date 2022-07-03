import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { ComponentModule } from './components/components.module';
import { PagesModule } from './pages/pages.module';
import { ShareModule } from './shares/share.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule,
    PagesModule,
    ShareModule,
    ComponentModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
