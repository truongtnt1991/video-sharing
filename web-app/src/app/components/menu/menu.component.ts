import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tokenKey } from 'src/app/auth/auth.constant';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from 'src/app/auth/user.model';
import { Menu } from 'src/app/pages/common-models/common.models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  open = true;
  menus: Menu[] = [];
  accountMenus: Menu[] = [];
  isLogin = !!localStorage.getItem(tokenKey);
  userInfo!: User;
  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.getUserInfo();
    this.createMenu();
  }

  toggleMenu() {
    this.open = !this.open;
  }

  getUserInfo() {
    const info = this.authService.getUserInfo();
    if (info) {
      this.userInfo = info;
    }
  }

  createMenu() {
    this.menus = [
      {
        title: 'Home',
        url: '/',
        imgSrc: 'assets/images/login.png',
        icon: 'home',
      },
      {
        title: 'Login',
        url: 'login',
        imgSrc: 'assets/images/login.png',
        icon: 'login',
      },
      {
        title: 'Register',
        url: 'register',
        imgSrc: 'assets/images/register.png',
        icon: 'group',
      },
    ];

    if (this.isLogin) {
      this.menus.push({
        title: 'Share a video',
        url: 'video-sharing',
        imgSrc: 'assets/images/sharing.ico',
        icon: 'share',
      });
      this.menus.push({
        title: 'Shared videos',
        url: 'video-shared',
        imgSrc: 'assets/images/sharing.ico',
        icon: 'send',
      });

      this.menus = this.menus.filter(
        (x) => !['login', 'register'].includes(x.url)
      );
    }
  }

  logout() {
    localStorage.removeItem(tokenKey);
    this.router.navigate(['/']).then(() => {
      window.location.reload();
    });
  }
}
