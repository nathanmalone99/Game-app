import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Order } from 'src/app/common/order';
import { OrderItem } from 'src/app/common/order-item';
import { CartService } from 'src/app/services/cart.service';
import { CheckoutService } from 'src/app/services/checkout.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent {

  checkoutForm!: FormGroup;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  storage: Storage = sessionStorage;

  constructor(private cartService: CartService,
              private checkoutService: CheckoutService,
              private formBuilder: FormBuilder,
              private userService: UserService,
              private router: Router ) { }
  
  

  onSubmit() {
    console.log("Handling submit button")

    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    // set up order
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;

    // get cart items
    const cartItems = this.cartService.cartItems;

    // create orderItems from cartItems
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));

    
  }

  resetCart() {
                
    this.cartService.cartItems = [];
    this.cartService.totalPrice.next(0);
    this.cartService.totalQuantity.next(0);
    this.cartService.persistCartItems();
              
    this.checkoutForm.reset();
              
    this.router.navigateByUrl("");
    }


}

