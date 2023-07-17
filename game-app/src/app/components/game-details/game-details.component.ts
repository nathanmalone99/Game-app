import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map } from 'rxjs';
import { Game } from 'src/app/common/game';
import { GamesService } from 'src/app/services/games.service';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent {

  game!: Game;
  id!: string;
 

  constructor (private _gamesService: GamesService,
              private activatedRoute: ActivatedRoute,
              private router: Router ) {}

   
  ngOnInIt(): void {
    this.activatedRoute.paramMap.pipe(
      map((param: ParamMap) => {
        return param.get("id");
      })
    ).subscribe(gameId => {
      this.id = gameId!; (
        this._gamesService.getGameById(this.id).subscribe)(gameProduct => {
          this.game = gameProduct;
        },
          (error: HttpErrorResponse) => {
            if (error.status == 404)
            this.router.navigate(['**'])
          })
    })
  } 
}
