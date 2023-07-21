import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../common/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isAuthenticated = false;
  private token!: string;
  private tokenTimer: any;
  private authStatusListener = new Subject<boolean>()
  private baseUrl: string = 'http://localhost:3000/api/users';

  constructor(private _httpClient: HttpClient,
              private router: Router) { }

  getUsers() {
    return this._httpClient.get(this.baseUrl);
  }        

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  createUser(email: string, password: string) {
    const userData: User = {email: email, password: password};
    this._httpClient.post("http://localhost:3000/api/signup", userData)
    .subscribe(response => {
      console.log(response);
    });
  }

  login(email: string, password: string) {
    const userData: User = {email: email, password: password};
    this._httpClient.post<{token: string, expiresIn: number}>("http://localhost:3000/api/login", userData)
      .subscribe(response => {
        const token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/']);
        }
      })
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
   }

   logout() {
    this.token = null!;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/']);
    }

    private setAuthTimer(duration: number) {
      console.log("Setting timer: ", + duration);
      this.tokenTimer = setTimeout(() => {
        this.logout();
      }, duration * 1000);
    }

    private saveAuthData(token: string, expirationDate: Date) {
      localStorage.setItem('token', token);
      localStorage.setItem('expiration', expirationDate.toISOString());
    }

    private clearAuthData() { 
      localStorage.removeItem("token");
      localStorage.removeItem("expiration");
    }

    private getAuthData() {
      const token = localStorage.getItem("token");
      const expirationDate = localStorage.getItem("expiration");
      if (!token || !expirationDate) {
        return;
      }
      return {
        token: token, 
        expirationDate: new Date(expirationDate)
      }
    }
}
