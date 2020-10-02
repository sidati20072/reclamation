import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Roles} from '../models/Roles';
import {UserModel} from '../models/UserModel';
import {AuthService} from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
    private usersUrl = environment.url + 'users/all';
    private usersByRoleUrl = environment.url + 'users/role/';
    private searchUserUrl = environment.url + 'users/search/findByUsername?username=';
    currentUser: UserModel;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.authService.isLogout.subscribe(() => this.currentUser = null);
    }

    getAllUsers() {
        return this.http.get(this.usersUrl);
    }

    getDeliveryUsers() {
        return this.http.get(`${this.usersByRoleUrl}${Roles.LIVREUR}`);
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
