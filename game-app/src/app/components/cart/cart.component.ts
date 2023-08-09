import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  cart: Cart = { items: [] };

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService, 
              private _httpClient: HttpClient) { }

  ngOnInit(): void {
    this.listCartDetails();
  }
  listCartDetails() {

    // get a handle to the cart items
    this.cartItems = this.cartService.cartItems

    // subscribe to the cart totalPrice
    this.cartService.totalPrice.subscribe(
      data => this.totalPrice = data
    );

    // subscribe to the cart totalQuantity
    this.cartService.totalQuantity.subscribe(
      data => this.totalQuantity = data
    );

    // compute cart total price and quantity
    this.cartService.computeCartTotals();
  }

  incrementQuantity(theCartItem: CartItem) {
    this.cartService.addToCart(theCartItem);
  }

  decrementQuantity(theCartItem: CartItem) {
    this.cartService.decrementQuantity(theCartItem);
  }

  remove(theCartItem: CartItem) {
    this.cartService.remove(theCartItem);
  }

  onCheckout(): void {
    this._httpClient.post('http://localhost:3000/api/checkout', {
      items: this.cart.items,
    }).subscribe(async (res: any) => { 
      let stripe = await loadStripe('pk_test_51N7gd7IB2R5TmgiivsbQfGz3Xix7juEdTtoQyzViy3smc2wQGR3RilkZoQgsFbsaaX2EZk5HKC2OZbntbslHQTKn00g0xqAmSM');
      stripe?.redirectToCheckout({
        sessionId: res.id,
      });
    });
  }
  
}


