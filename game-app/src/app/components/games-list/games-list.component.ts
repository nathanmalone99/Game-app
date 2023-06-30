import { Component } from '@angular/core';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent {

  public games: any = [{
    title: '',
    description: '',
    pgRating: '',
    price: ''
  }];

  constructor(private _gamesService: GamesService) {}

  ngOnInit(): void {
    this._gamesService.getGames().subscribe(games => {
      console.log('list of games', games);
    })
  }
}
