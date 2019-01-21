import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public registerForm: FormGroup;
  public err: string;

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.registerForm = this.initRegisterForm();
  }

  resetForm() {
    this.registerForm.reset();
  }

  @HostListener('document:keydown.enter')
  registerUser() {

    if (this.registerForm.invalid) {
      return;
    }

    console.log(this.registerForm.value);

    this.authService.register(this.registerForm.value).subscribe(res => {
      console.log('Registered user ', res);
      this.router.navigateByUrl('/login');
    }, err => {
      console.log(err);
      this.err = err.error.msg;
    });
  }

  private initRegisterForm(): FormGroup {
    return new FormGroup({
      email: new FormControl(null, { validators: [Validators.required, Validators.email] }),
      password: new FormControl(null, Validators.required),
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required),
    });
  }

}
