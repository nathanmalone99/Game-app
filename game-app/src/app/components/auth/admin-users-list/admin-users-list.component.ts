import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent {

  public users: any = [];

  constructor(private userService: UserService,
               private router: Router) {}


  ngOnInit(): void {
    this.userService.getUsers().subscribe(users => {
    this.users = users;
    })
  }

}
