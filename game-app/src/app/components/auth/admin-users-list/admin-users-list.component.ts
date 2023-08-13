import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent {

  public users: any = [];

  constructor(private userService: UserService,
              private router: Router,
              private _httpClient: HttpClient) {}


  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
    this.users = users;
    })
  }

  addUser(email: string, password: string) {
    const postUser: User = { email: email, password: password}
    this._httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/signup', postUser)
    .subscribe((responseData) => {
      this.router.navigate(["/"]);
    });
  }


  /* updateUser(email: string, password: string) {
    const putUser: User = { email: email, password: password}
    this._httpClient.put("http://localhost:3000/api/" + id, post)
    .subscribe(response => {
      this.router.navigate(["/"]);
    });
  } */

}
