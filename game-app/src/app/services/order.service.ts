import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../common/order';
import { OrderHistory } from '../common/order-history';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string = 'http://localhost:3000/api/orders';

  constructor(private _httpClient: HttpClient) { }

  getOrders() {
    return this._httpClient.get<OrderHistory[]>(this.baseUrl);
  }
}
