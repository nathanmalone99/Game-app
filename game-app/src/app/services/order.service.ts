import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../common/order';
import { OrderHistory } from '../common/order-history';
import { AuthGuard } from '../components/auth/auth-guard';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  private baseUrl: string = 'http://localhost:3000/api/orders';

  constructor(private _httpClient: HttpClient, 
              private userService: UserService) { }

  getOrdersForUser() {
    const userEmail = this.userService.getUserEmail();
    if (!userEmail) {
      console.error('User email not found');
      return;
    }
    const encodedEmail = encodeURIComponent(userEmail);
    const userOrdersUrl = `${this.baseUrl}/user/${encodedEmail}`;
    return this._httpClient.get<OrderHistory[]>(userOrdersUrl);
  }
}
