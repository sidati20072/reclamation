import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {JwtHelperService} from '@auth0/angular-jwt';
import {Router} from '@angular/router';
import {Roles} from '../models/Roles';
import {Subject} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    // private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn);
    // authStatus = this.loggedIn.asObservable();
    jwt: string;
    username: string;
    name: string;
    roles: Array<any>;
    isLogout = new Subject();

    constructor(private http: HttpClient, private router: Router) {
    }

    changeAuthStatus(value: boolean) {
        // this.loggedIn.next(value);
    }


    login(data) {
        return this.http.post(environment.url + 'login', data, {observe: 'response'});
    }

    saveToken(jwt: string) {
        localStorage.setItem('token', jwt);
        this.jwt = jwt;
        this.parseJWT();
    }

    parseJWT() {
        const jwtHelper = new JwtHelperService();
        const objJWT = jwtHelper.decodeToken(this.jwt);
        this.username = objJWT.sub;
        this.roles = objJWT.roles;
    }

    isAdmin() {
        this.loadToken();
        if (this.roles) {
            const pos = this.roles.map((e) => e.authority).indexOf(Roles.ADMIN);
            return pos >= 0;
        } else {
            this.logout();
        }
    }

    isClient() {
        this.loadToken();
        if (this.roles) {
            const pos = this.roles.map((e) => e.authority).indexOf(Roles.USER);
            return pos >= 0;
        } else {
            this.logout();
        }
    }

    loadToken() {
        this.jwt = localStorage.getItem('token');
        this.jwt ? this.parseJWT() : this.logout();
    }

    async logout() {
        localStorage.clear();
        this.initParams();
        await this.router.navigateByUrl('/pages/auth/login');
    }

    initParams() {
        this.username = undefined;
        this.jwt = undefined;
        this.roles = undefined;
        this.isLogout.next(true);
    }

    isAuthenticated() {
        if (localStorage.getItem('token') !== null) {
            this.loadToken();
        }
        return this.roles && (this.isAdmin() || this.isClient());
    }
}
