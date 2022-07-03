import { Component, OnInit } from '@angular/core';
import { Menu } from '../common-models/common.models';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  open = true;
  menus: Menu[] = [];
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
  }
}
