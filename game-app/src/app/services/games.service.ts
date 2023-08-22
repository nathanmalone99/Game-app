import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Game } from '../common/game';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private baseUrl: string = 'http://localhost:3000/api/games';

  constructor(private _httpClient: HttpClient) { }

  getGames() {
    return this._httpClient.get(this.baseUrl);
  }

   getGameById(id: string): Observable<Game> {
    return this._httpClient.get<Game>(this.baseUrl + id);
  } 

}
