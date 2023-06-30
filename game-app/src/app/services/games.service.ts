import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GamesService {

  private baseUrl: string = 'http://localhost:3000/games';

  constructor(private _httpClient: HttpClient) { }

  getGames() {
    return this._httpClient.get(this.baseUrl);
  }
}
