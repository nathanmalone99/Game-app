import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';
import { AuthInterceptor } from './components/auth/auth-interceptor';

import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatPaginatorModule} from '@angular/material/paginator';


import { AppComponent } from './app.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './components/cart/cart.component';
import { CartStatusComponent } from './components/cart-status/cart-status.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { LoginComponent } from './components/auth/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminDashboardComponent } from './components/auth/admin-dashboard/admin-dashboard.component';
import { SuccessComponent } from './components/success/success.component';
import { CancelComponent } from './components/cancel/cancel.component';
import { AdminGuard } from './components/auth/admin-guard';
import { AuthGuard } from './components/auth/auth-guard';
import { AdminGamesListComponent } from './components/auth/admin-games-list/admin-games-list.component';
import { AdminUsersListComponent } from './components/auth/admin-users-list/admin-users-list.component';
import { CreateGamesComponent } from './components/auth/create-games/create-games.component';
import { CreateUsersComponent } from './components/auth/create-users/create-users.component';
import { OrderHistoryComponent } from './components/order-history/order-history.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    NavbarComponent,
    GameDetailsComponent,
    CartComponent,
    CartStatusComponent,
    SignupComponent,
    LoginComponent,
    AdminDashboardComponent,
    SuccessComponent,
    CancelComponent,
    AdminGamesListComponent,
    AdminUsersListComponent,
    CreateGamesComponent,
    CreateUsersComponent,
    OrderHistoryComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatToolbarModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    AdminGuard,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
