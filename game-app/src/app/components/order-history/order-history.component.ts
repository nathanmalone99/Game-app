import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent {

  orders: OrderHistory[] = [];

  constructor (
               private orderService: OrderService ) {}

  ngOnInit(): void {
    this.orderService.getOrders().subscribe( orders => {
      this.orders = orders;
    })
  }

}
