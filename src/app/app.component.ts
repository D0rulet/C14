import { Component } from '@angular/core';
import { AuthService } from './auth.service';
import { MsGraphService } from './ms-graph.service';
import { User } from 'msal/lib-es6/user';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    public user: User = null;
    public userInfo: any = null;
    public apiCallFailed: boolean;
    public loginFailed: boolean;

    constructor(private authService: AuthService,
                private msGraphService: MsGraphService) {
    }

    public login() {
        this.loginFailed = false;
        this.authService.login()
            .then(user => {
                if (user) {
                    this.user = user;
                } else {
                    this.loginFailed = true;
                }
            }, () => {
                this.loginFailed = true;
            });
    }

    private getMeInfo() {
        this.apiCallFailed = false;
        this.authService.getToken()
            .then(token => {
                this.msGraphService.getUserInfo(token)
                    .subscribe(data => {
                        this.userInfo = data;
                    }, error => {
                        console.error(error);
                        this.apiCallFailed = true;
                    });
            }, error => {
                console.error(error);
                this.apiCallFailed = true;
            });
    }

    private logout() {
        this.authService.logout();
    }
}
