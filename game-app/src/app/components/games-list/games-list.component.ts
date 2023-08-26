import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CartItem } from 'src/app/common/cart-item';
import { Game } from 'src/app/common/game';
import { CartService } from 'src/app/services/cart.service';
import { GamesService } from 'src/app/services/games.service';


@Component({
  selector: 'app-games-list',
  templateUrl: './games-list.component.html',
  styleUrls: ['./games-list.component.css']
})
export class GamesListComponent {

  public games: any = [];

  constructor(private _gamesService: GamesService,
              private router: Router,
              private cartService: CartService) {
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

  addToCart(theGame: Game) {
    console.log(`Adding to cart: ${theGame.title}, ${theGame.price}`);

    
    const theCartItem = new CartItem(theGame);

    this.cartService.addToCart(theCartItem);
  }
}

