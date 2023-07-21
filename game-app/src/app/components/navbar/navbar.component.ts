import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit, OnDestroy{

  userIsAuthenticated = false;
  private authListenerSubs!: Subscription;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated => {
    this.userIsAuthenticated = isAuthenticated; 
    });
  }

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
}

}
