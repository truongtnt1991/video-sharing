import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AlwaysAuthGuard } from './always-auth-guard ';
import { JwtModule } from '@auth0/angular-jwt';
import { tokenKey } from './auth.constant';

@NgModule({
  declarations: [],
  imports: [
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: () => {
          return localStorage.getItem(tokenKey);
        },
      },
    }),
  ],
  providers: [AlwaysAuthGuard],
})
export class AuthModule {}
