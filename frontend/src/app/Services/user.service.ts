import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {UserModel} from '../models/UserModel';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class UserService {
    currentUser: UserModel;
    private usersUrl = environment.url + 'users/all';
    private usersByRoleUrl = environment.url + 'users/role/';
    private searchUserUrl = environment.url + 'users/';

    constructor(private http: HttpClient, private authService: AuthService) {
        this.authService.isLogout.subscribe(() => this.currentUser = null);
    }

    getAllUsers() {
        return this.http.get(this.usersUrl);
    }

    getUserByUsername(userName) {
        this.authService.loadToken();
        return this.http.get<UserModel>(this.searchUserUrl + userName);
    }

    async getCurrentUser() {
        if (!this.currentUser && this.authService.isAuthenticated()) {
            await new Promise(resolve => {
                this.getUserByUsername(this.authService.username).subscribe(
                    value => {
                        this.currentUser = value;
                        resolve(this.currentUser);
                    },
                    error => {
                        resolve();
                        this.authService.logout();
                    }
                );
            });
            return this.currentUser;
        } else {

            return this.currentUser;
        }
    }

}
