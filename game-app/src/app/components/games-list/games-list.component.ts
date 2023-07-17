import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GamesService } from 'src/app/services/games.service';


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent {

  public games: any = [];

  constructor(private _gamesService: GamesService,
              private router: Router) {
  }

  ngOnInit(): void {
    this._gamesService.getGames().subscribe(games => {
      this.games = games;
    })
  }

  selectGame(id: string) {
    this.router.navigate(['/games', id]).then();
  }
  navigateTo(anchor: string) {
    this.router.navigate([''], {fragment: anchor});
  }
}

