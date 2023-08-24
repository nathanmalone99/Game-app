import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';
import { OrderHistory } from 'src/app/common/order-history';
import { OrderService } from 'src/app/services/order.service';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-order-history',
  templateUrl: './order-history.component.html',
  styleUrls: ['./order-history.component.css']
})
export class OrderHistoryComponent implements OnInit {

  orders: OrderHistory[] = [];
  isLoading: boolean = false; 
  errorMessage: string | null = null; 

  constructor (private orderService: OrderService, 
               private userService: UserService,
               private router: Router) {}

  

  ngOnInit(): void {
    this.checkAuthentication();
    this.fetchOrderHistory();
  }

  private checkAuthentication(): void {
    if (!this.userService.getIsAuth()) {
      this.router.navigate(['/login']);
    }
  }

  private fetchOrderHistory(): void {
    this.isLoading = true;
    this.errorMessage = null;

    const userEmail = this.userService.getUserEmail();

    console.log("Email from service:", userEmail);
  
    this.orderService.getOrdersForUser().subscribe(
      (data: OrderHistory[]) => {
        console.log('Orders fetched:', data);
        this.orders = data;
        this.isLoading = false;
      },
      error => {
          console.error('Error fetching Orders:', error);
          this.errorMessage = "Failed to fetch your order history. Please log in again.";
          this.isLoading = false;
        }
    );
  }

}
