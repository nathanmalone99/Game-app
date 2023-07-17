import { RouterModule, Routes } from "@angular/router";
import { GameDetailsComponent } from "./components/game-details/game-details.component";
import { NgModule } from "@angular/core";
import { GamesListComponent } from "./components/games-list/games-list.component";
import { CartComponent } from "./components/cart/cart.component";


const routes: Routes = [
    {path: '', component: GamesListComponent},
    {path: 'games/:_id', component: GameDetailsComponent},
    {path: 'cart', component: CartComponent},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }