import { RouterModule, Routes } from "@angular/router";
import { GameDetailsComponent } from "./components/game-details/game-details.component";
import { NgModule } from "@angular/core";
import { GamesListComponent } from "./components/games-list/games-list.component";
import { CartComponent } from "./components/cart/cart.component";
import { LoginComponent } from "./components/auth/login/login.component";
import { SignupComponent } from "./components/auth/signup/signup.component";
import { AdminDashboardComponent } from "./components/auth/admin-dashboard/admin-dashboard.component";
import { CancelComponent } from "./components/cancel/cancel.component";
import { SuccessComponent } from "./components/success/success.component";
import { AdminGuard } from "./components/auth/admin-guard";
import { AuthGuard } from "./components/auth/auth-guard";
import { AdminUsersListComponent } from "./components/auth/admin-users-list/admin-users-list.component";
import { AdminGamesListComponent } from "./components/auth/admin-games-list/admin-games-list.component";
import { CreateGamesComponent } from "./components/auth/create-games/create-games.component";


const routes: Routes = [
    {path: '', component: GamesListComponent},
    {path: 'games/:_id', component: GameDetailsComponent},
    {path: 'cart', component: CartComponent},
    {path: 'success', component: SuccessComponent},
    {path: 'cancel', component: CancelComponent},
    {path: 'login', component: LoginComponent},
    {path: 'signup', component: SignupComponent},
    {path: 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard] },
    {path: 'admin-games', component: AdminGamesListComponent, canActivate: [AuthGuard] },
    {path: 'create-games', component: CreateGamesComponent, canActivate: [AuthGuard] },
    {path: 'games-edit/:postId', component: CreateGamesComponent, canActivate: [AuthGuard] },
    {path: 'admin-users', component: AdminUsersListComponent, canActivate: [AuthGuard] }
    
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }