import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent {

  public users: any = [];

  constructor(private userService: UserService,
               private router: Router) {
}

ngOnInit(): void {
  this.userService.getUsers().subscribe(users => {
    this.users = users;
  })
}

}
