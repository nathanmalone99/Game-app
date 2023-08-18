import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Game } from 'src/app/common/game';
import { GamesService } from 'src/app/services/games.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGamesService {

 private games: Game[] = [];
 private gamesUpdated = new Subject<{games: Game[], gameCount: number}>();

  constructor(private _gamesService: GamesService,
    private router: Router, 
    private _httpClient: HttpClient) {
  }


  getGames(gamesPerPage: number, currentPage: number) {
    const queryParams = `?pagesize=${gamesPerPage}&page=${currentPage}`;
    this._httpClient
      .get<{message: string, games: any, maxPosts: number}>('http://localhost:3000/api/admin/games' + queryParams)
      .pipe(map((gameData) => {
        return { games: gameData.games.map(game => {
          return {
            _id: game._id,
            title: game.title,
            description: game.description,
            pgRating: game.pgRating,
            price: game.price,
            imageUrl: game.imageUrl,
          };
        }), maxPosts: gameData.maxPosts};
      }))
      .subscribe((transformedGameData) => {
        this.games = transformedGameData.games;
        this.gamesUpdated.next({ games: [...this.games], gameCount: transformedGameData.maxPosts
        });
      });
  }

  getGameUpdateListener() {
    return this.gamesUpdated.asObservable();
  }


  getGame(id: string) {
    return this._httpClient.get<{_id: string, title: string, description: string, pgRating: string, price: number, imageUrl: string}>("http://localhost:3000/api/games" + id)
  }

  addGame( title: string, description: string, pgRating: string, price: number, imageUrl: string) {
    const game: Game = {_id: null, title: title, description: description, pgRating: pgRating, price: price, imageUrl: imageUrl}
    this._httpClient.post<{message: string, postId: string}>('http://localhost:3000/api/games/post', game)
    .subscribe((responseData) => {
      this.router.navigate(["/"]);
    });
  }

  updateGame(id: string,  title: string, description: string, pgRating: string, price: number, imageUrl: string) {
    const game: Game = {_id: null, title: title, description: description, pgRating: pgRating, price: price, imageUrl: imageUrl}
    this._httpClient.put("http://localhost:3000/api/games/edit" + id, game)
    .subscribe(response => {
      this.router.navigate(["/"]);
    });
  }

  deleteGame(postId: string) {
    return this._httpClient
      .delete("http://localhost:3000/api/games/delete" + postId);
  }
}
