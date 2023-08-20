import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from 'src/app/common/user';

@Injectable({
  providedIn: 'root'
})
export class AdminUsersService {

  private users: User[] = [];
  private usersUpdated = new Subject<{users: User[], userCount: number}>();

  constructor(private router: Router, 
    private _httpClient: HttpClient) {
  }


  getUsers(gamesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${gamesPerPage}&page=${currentPage}`;
    this._httpClient
      .get<{message: string, users: any, maxPosts: number}>('http://localhost:3000/api/admin/users' + queryParams)
      .pipe(map((userData) => {
        return { users: userData.users.map(user => {
          return {
            _id: user._id,
            email: user.email,
            password: user.password,
            isAdmin: user.isAdmin
          };
        }), maxPosts: userData.maxPosts};
      }))
      .subscribe((transformedGameData) => {
        this.users = transformedGameData.users;
        this.usersUpdated.next({ users: [...this.users], userCount: transformedGameData.maxPosts
        });
      });
  }

  getUserUpdateListener() {
    return this.usersUpdated.asObservable();
  }


  getUser(id: string) {
    return this._httpClient.get<{_id: string, title: string, description: string, pgRating: string, price: number, imageUrl: string}>("http://localhost:3000/api/admin/users/" + id)
  }

  addUser( email: string, password: string) {
    const user: User = {_id: null, email: email, password: password}
    this._httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/admin/users/post', user)
    .subscribe((responseData) => {
      this.router.navigate(["/"]);
    });
  }

  updateUser(id: string,  email: string, password: string) {
    const user: User = {_id: null, email: email, password: password}
    this._httpClient.put("http://localhost:3000/api/admin/users/edit/" + id, user)
    .subscribe(response => {
      this.router.navigate(["/"]);
    });
  }

  deleteUser(postId: string) {
    return this._httpClient
      .delete("http://localhost:3000/api/admin/users/delete/" + postId);
  }
}
