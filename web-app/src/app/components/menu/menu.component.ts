import { Component, OnInit } from '@angular/core';
import { tokenKey } from 'src/app/auth/auth.constant';
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
  constructor() {}

  ngOnInit(): void {
    this.createMenu();
  }

  toggleMenu() {
    this.open = !this.open;
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
      {
        title: 'Share video',
        url: 'video-sharing',
        imgSrc: 'assets/images/sharing.ico',
        icon: 'share',
      },
    ];

    if (this.isLogin) {
      this.accountMenus = [
        {
          title: 'Shared video',
          url: 'video-sharing',
          imgSrc: 'assets/images/sharing.ico',
          icon: 'send',
        },
      ];
      this.menus = this.menus.filter(
        (x) => !['login', 'register'].includes(x.url)
      );
    }
  }
}
