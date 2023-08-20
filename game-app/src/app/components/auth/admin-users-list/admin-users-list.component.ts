import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/common/user';
import { UserService } from 'src/app/services/user.service';
import { AdminUsersService } from '../admin-users.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-users-list',
  templateUrl: './admin-users-list.component.html',
  styleUrls: ['./admin-users-list.component.css']
})
export class AdminUsersListComponent {

  users: User[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  userIsAuthenticated = false;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public adminUsersService: AdminUsersService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.adminUsersService.getUsers(this.postsPerPage, this.currentPage);
    this.postsSub = this.adminUsersService.getUserUpdateListener()
      .subscribe((userData: {users: User[], userCount: number}) => {
        this.isLoading = false;
        this.totalPosts = userData.userCount;
        this.users = userData.users;
    });
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authStatusSub = this.userService.getAuthStatusListener().subscribe(isAuthenticated => {
      this.userIsAuthenticated = isAuthenticated;
    });
  }

  onChangedPage(pageData: PageEvent) {
    this.isLoading = true;
    this.currentPage = pageData.pageIndex + 1;
    this.postsPerPage = pageData.pageSize;
    this.adminUsersService.getUsers(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.adminUsersService.deleteUser(postId).subscribe(() => {
      this.adminUsersService.getUsers(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }

}
