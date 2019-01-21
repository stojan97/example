import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { JwtHelperService } from '@auth0/angular-jwt';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public user: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private jwtHelper = new JwtHelperService();

  constructor(private http: HttpClient, private router: Router) { }

  public login(user) {
    return this.http.post<any>(`http://localhost:8000/api/login`, user);
  }

  public register(user) {
    return this.http.post<any>(`http://localhost:8000/api/register`, user);
  }

  public getUserToken() {
    return localStorage.getItem('token');
  }

  public setUserToken(token) {
    localStorage.setItem('token', token);
  }

  public loginUser(token) {
    this.setUpUser(token);
  }

  public logoutUser() {
    this.user.next(null);
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }

  public setValidationUserToken(token) {
    this.setUserToken(token);
    return this.jwtHelper.decodeToken(token);
  }

  setUpUser(token) {
    const val = !this.jwtHelper.isTokenExpired(token) ? this.setValidationUserToken(token) : null;
    console.log('TOKEEN', val);
    this.user.next(val);
  }

  public validateUserToken() {
    const token = this.getUserToken();
    if (token) {
      this.setUpUser(token);
    }
  }
}
