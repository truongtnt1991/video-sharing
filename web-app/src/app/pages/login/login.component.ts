import { BaseComponent } from 'src/app/shares/base-component';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LoginService } from './login.service';
import { Router } from '@angular/router';
import { tokenKey } from 'src/app/auth/auth.constant';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent extends BaseComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg!: string;
  constructor(
    private fb: FormBuilder,
    private loginService: LoginService,
    private router: Router
  ) {
    super();
    this.loginForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem(tokenKey)) {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }

  onLogin() {
    if (this.loginForm.invalid) {
      this.errorMsg = '';
      this.loginForm.markAllAsTouched();
      return;
    }
    this.subscribe(
      this.loginService.login(this.loginForm.value),
      (res) => {
        localStorage.setItem(tokenKey, res.token);
        this.router.navigate(['/']).then(() => {
          window.location.reload();
        });
      },
      (error) => {
        this.errorMsg = error.error.error;
      }
    );
  }

  get userName() {
    return this.loginForm.get('userName');
  }

  get password() {
    return this.loginForm.get('password');
  }
}
