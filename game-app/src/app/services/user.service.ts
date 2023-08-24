import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { User } from '../common/user';
import { Router } from '@angular/router';
import { throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private isAdmin = false;

  
  private userId: string;
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

  setUserId(userId: string): void {
    localStorage.setItem('userId', userId);
  }

  getUserId(): string {
    return localStorage.getItem('userId');
  }

  createUser(email: string, password: string) {
    const userData: User = {email: email, password: password};
    this._httpClient.post("http://localhost:3000/api/signup", userData)
    .pipe(
      catchError(err => {
        console.error(err);
        return throwError(err);
      })
    )
    .subscribe(response => {
      console.log(response);
    });
  }

  

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  } 

  login(email: string, password: string) {
    const userData: User = {email: email, password: password};
    this._httpClient.post<{token: string, expiresIn: number, userId: string, isAdmin: boolean, email: string}>("http://localhost:3000/api/login", userData)
    .pipe(
      catchError(err => {
         console.error("Error during login:", err);
         return throwError(err);
        })
      )
      .subscribe(response => {
        console.log("Full login response:", response);
        const token = response.token;
        this.token = token;
        if (token) {

          this.userId = response.userId; 
          
          localStorage.setItem('userEmail', response.email);
          console.log("Email from API response:", response.email);

          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(now.getTime() + expiresInDuration * 1000);
          console.log(expirationDate);
          this.saveAuthData(token, expirationDate);
          
          this.isAdmin = response.isAdmin;
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
      localStorage.removeItem("userEmail");
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

   

    isAdminUser() {
      return this.isAdmin;
  }
}
