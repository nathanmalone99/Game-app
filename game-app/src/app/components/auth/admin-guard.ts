import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { UserService } from "src/app/services/user.service";


@Injectable()
export class AdminGuard implements CanActivate {

    constructor(private userService: UserService,
                private router: Router) {}



    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
        ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        const isAuth = this.userService.getIsAuth();
        const isAdmin = this.userService.isAdminUser();
        if (!isAuth || !isAdmin) {
            this.router.navigate(['/login']);
        }
        return isAuth && isAdmin;
    }
}
