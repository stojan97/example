import { Component, OnInit, Input, HostListener } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public err: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.loginForm = this.initLoginForm();
  }

  resetForm() {
    this.loginForm.reset();
  }

  @HostListener('document:keydown.enter')
  loginUser() {

    if (this.loginForm.invalid) {
      return;
    }

    console.log(this.loginForm.value);

    this.authService.login(this.loginForm.value).subscribe(res => {
      console.log(res);
      this.authService.loginUser(res);
      this.router.navigateByUrl('/user');
    }, err => {
      console.log(err);
      this.err = err.error.msg;
    });
  }

  private initLoginForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, Validators.required)
    });
  }

}
