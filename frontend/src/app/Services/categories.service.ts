import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {UserModel} from '../models/UserModel';
import {AuthService} from './auth.service';

@Injectable({
    providedIn: 'root'
})
export class CategoriesService {
    private parentCategoriesUrl = environment.url + 'categories/parents/';
    private addCategoryUrl = environment.url + 'categories/pro';

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    getParentCategories(userId) {
        return this.http.get(this.parentCategoriesUrl + userId);
    }

    addCategory(userId, catId) {
        return this.http.post<UserModel>(this.addCategoryUrl, {userId, categoryId: catId});

    }

    deleteCategory(userId, catId) {
        return this.http.patch<UserModel>(this.addCategoryUrl, {userId, categoryId: catId});

    }
}
