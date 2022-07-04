import { BaseComponent } from 'src/app/shares/base-component';
import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { tokenKey } from 'src/app/auth/auth.constant';
import { RegisterService } from './register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent extends BaseComponent implements OnInit {
  registerForm: FormGroup;
  errorMsg!: string;
  successMsg!: string;
  constructor(
    private fb: FormBuilder,
    private registerService: RegisterService,
    private router: Router
  ) {
    super();
    this.registerForm = this.fb.group({
      userName: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      fullName: new FormControl('', Validators.required),
    });
  }

  ngOnInit(): void {
    if (localStorage.getItem(tokenKey)) {
      this.router.navigate(['/']).then(() => {
        window.location.reload();
      });
    }
  }

  onRegister() {
    if (this.registerForm.invalid) {
      this.errorMsg = '';
      this.registerForm.markAllAsTouched();
      return;
    }
    this.subscribe(
      this.registerService.register(this.registerForm.value),
      (res) => {
        this.errorMsg = '';
        this.successMsg = res.message;
        this.registerForm.reset();
      },
      (error) => {
        this.errorMsg = error.error.error;
      }
    );
  }

  get userName() {
    return this.registerForm.get('userName');
  }

  get password() {
    return this.registerForm.get('password');
  }

  get fullName() {
    return this.registerForm.get('fullName');
  }
}
