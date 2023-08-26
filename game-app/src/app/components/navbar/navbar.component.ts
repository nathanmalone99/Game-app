import { HttpClient } from '@angular/common/http';
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
  searchTerm: string = '';
  games: any[] = [];

  constructor(private userService: UserService,
              private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.userIsAuthenticated = this.userService.getIsAuth();
    this.authListenerSubs = this.userService.getAuthStatusListener().subscribe(isAuthenticated => {
    this.userIsAuthenticated = isAuthenticated; 
    });
  }

  onSearch(event: Event) {
    event.preventDefault(); 
    this.searchGames(); 
}

  onLogout() {
    this.userService.logout();
  }

  ngOnDestroy(): void {
    this.authListenerSubs.unsubscribe();
}

searchGames() {
  this._httpClient.get<any[]>('/api/search', { params: { term: this.searchTerm } })
      .subscribe(
          results => {
              this.games = results; // Update the games list with the search results
          },
          error => {
              console.error('Error fetching search results:', error);
          }
      );
}

}
