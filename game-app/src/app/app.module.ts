import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { GamesListComponent } from './components/games-list/games-list.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GameDetailsComponent } from './components/game-details/game-details.component';
import { AppRoutingModule } from './app-routing.module';
import { CartComponent } from './components/cart/cart.component';

@NgModule({
  declarations: [
    AppComponent,
    GamesListComponent,
    NavbarComponent,
    GameDetailsComponent,
    CartComponent
  ],
  imports: [
    BrowserModule,
    RouterModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
