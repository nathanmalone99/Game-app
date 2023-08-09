import { RouterModule, Routes } from "@angular/router";
import { GameDetailsComponent } from "./components/game-details/game-details.component";
import { NgModule } from "@angular/core";
import { GamesListComponent } from "./components/games-list/games-list.component";
import { CartComponent } from "./components/cart/cart.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { AdminDashboardComponent } from "./components/auth/admin-dashboard/admin-dashboard.component";


const routes: Routes = [
    {path: '', component: GamesListComponent},
    {path: 'games/:_id', component: GameDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'admin', component: AdminDashboardComponent},
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }