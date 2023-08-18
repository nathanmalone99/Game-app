import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/common/game';
import { GamesService } from 'src/app/services/games.service';
import { AdminGamesService } from '../admin-games.service';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-admin-games-list',
  templateUrl: './admin-games-list.component.html',
  styleUrls: ['./admin-games-list.component.css']
})
export class AdminGamesListComponent {

  games: Game[] = [];
  isLoading = false;
  totalPosts = 0;
  postsPerPage = 2;
  currentPage = 1;
  pageSizeOptions = [1, 2, 5, 10];

  userIsAuthenticated = false;
  private postsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(public adminGamesService: AdminGamesService, private userService: UserService) { }

  ngOnInit(): void {
    this.isLoading = true;
    this.adminGamesService.getGames(this.postsPerPage, this.currentPage);
    this.postsSub = this.adminGamesService.getGameUpdateListener()
      .subscribe((gameData: {games: Game[], gameCount: number}) => {
        this.isLoading = false;
        this.totalPosts = gameData.gameCount;
        this.games = gameData.games;
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
    this.adminGamesService.getGames(this.postsPerPage, this.currentPage);
  }

  onDelete(postId: string) {
    this.isLoading = true;
    this.adminGamesService.deleteGame(postId).subscribe(() => {
      this.adminGamesService.getGames(this.postsPerPage, this.currentPage);
    });
  }

  ngOnDestroy() {
    this.postsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }


  

}
