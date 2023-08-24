import { HttpHeaders, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { UserService } from "src/app/services/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor (private userService: UserService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {
        const authToken = this.userService.getToken();
        console.log("Auth Token:", authToken);

        if (!authToken) {
            return next.handle(req);
        }
        const headers = new HttpHeaders({
            'Authorization': 'Bearer ' + authToken
        });

        const authRequest = req.clone({
            headers: headers
        })
        return next.handle(authRequest);
    }
}  