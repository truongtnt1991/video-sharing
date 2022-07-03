import { Component, OnInit } from '@angular/core';
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
        title: 'Login',
        url: 'login',
        imgSrc: 'assets/images/login.png',
      },
      {
        title: 'Register',
        url: 'Register',
        imgSrc: 'assets/images/register.png',
      },
      {
        title: 'Share video',
        url: 'video-sharing',
        imgSrc: 'assets/images/sharing.ico',
      },
    ];

    this.accountMenus = [
      {
        title: 'Shared video',
        url: 'video-sharing',
        imgSrc: 'assets/images/sharing.ico',
      },
    ];
  }
}
