import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit} from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Game } from 'src/app/common/game';
import { GamesService } from 'src/app/services/games.service';
import { CartService } from 'src/app/services/cart.service';
import { CartItem } from 'src/app/common/cart-item';

@Component({
  selector: 'app-game-details',
  templateUrl: './game-details.component.html',
  styleUrls: ['./game-details.component.css']
})
export class GameDetailsComponent {

  game!: any;
  // games!: Game
 

  constructor (private _gamesService: GamesService,
              private activatedRoute: ActivatedRoute,
              private router: Router,
              private cartService: CartService ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.game = data;
      console.log('Check route resolver data')
      console.log(data)
    })
  }


  /* addToCart() {

    console.log(`Adding to cart: ${this.games.title}, ${this.games.price}`);
    const theCartItem = new CartItem(this.games);
    this.cartService.addToCart(theCartItem);
  } */
}
