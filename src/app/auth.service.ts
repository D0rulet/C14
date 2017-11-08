import { Injectable } from '@angular/core';
import 'msal/dist/msal.js';
import { UserAgentApplication } from 'msal';
/// <reference path="msal/lib-es6/UserAgentApplication.d.ts" />

@Injectable()
export class AuthService {
    private applicationConfig: any = {
        clientID: 'a77a560a-e0d2-4da5-b2a8-9f15665aa48a',
        graphScopes: ['user.read']
    };
    private app: any;

    constructor() {
        this.app = new UserAgentApplication(this.applicationConfig.clientID, '', () => {
            // callback for login redirect
        });
    }
    public login() {
        return this.app.loginPopup(this.applicationConfig.graphScopes)
            .then(idToken => {
                const user = this.app.getUser();
                if (user) {
                    return user;
                } else {
                    return null;
                }
            }, () => {
                return null;
            });
    }
    public logout() {
        this.app.logout();
    }
    public getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.graphScopes)
            .then(accessToken => {
                return accessToken;
            }, error => {
                return this.app.acquireTokenPopup(this.applicationConfig.graphScopes)
                    .then(accessToken => {
                        return accessToken;
                    }, err => {
                        console.error(err);
                    });
            });
    }
}
