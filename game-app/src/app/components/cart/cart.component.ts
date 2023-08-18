import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { loadStripe } from '@stripe/stripe-js';
import { Cart, CartItem } from 'src/app/common/cart-item';
import { CartService } from 'src/app/services/cart.service';
import { ChangeDetectorRef } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {

  private stripePromise = loadStripe('pk_test_51N7gd7IB2R5TmgiivsbQfGz3Xix7juEdTtoQyzViy3smc2wQGR3RilkZoQgsFbsaaX2EZk5HKC2OZbntbslHQTKn00g0xqAmSM');
  cart!: Cart;

  cartItems: CartItem[] = [];
  totalPrice: number = 0;
  totalQuantity: number = 0;

  constructor(private cartService: CartService, 
              private _httpClient: HttpClient,
              private changeDetector: ChangeDetectorRef, 
              private router: Router
              ) { 
                this.cart = new Cart();
              }

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

  async checkout() {
    try {
      const payload = {
        items: this.cartItems
    };
  
      console.log(this.cart); 
      
      const session$ = this._httpClient.post<{ sessionId: string }>('http://localhost:3000/api/checkout', payload);
      const { sessionId } = await firstValueFrom(session$);
  
  
      const stripe = await this.stripePromise;
      const { error } = await stripe!.redirectToCheckout({ sessionId });
  
      if (error) {
        console.error(error);
      } else {
        this.cartService.clearCart();
        this.resetCart();
        this.changeDetector.detectChanges();
    }
    } catch (error) {
      console.error("Error during checkout:", error);
    }
    }

    /* resetCartState() {
      this.cartItems = [];
      this.totalPrice = 0;
      this.totalQuantity = 0;
      console.log("Resetting the cart state in the component.");
    } */

    resetCart() {
    
      this.cartService.cartItems = [];
      this.cartService.totalPrice.next(0);
      this.cartService.totalQuantity.next(0);
      this.cartService.persistCartItems();

      this.router.navigateByUrl("/");
  }
  
}


