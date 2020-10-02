import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthService} from './auth.service';
import {environment} from '../../environments/environment';
import {ItemModel} from '../models/ItemModel';

@Injectable({
    providedIn: 'root'
})
export class ItemService {
    private createUrl = environment.url + 'items/create';
    private getServiceUrl = environment.url + 'items/';
    private removeServiceUrl = environment.url + 'items/';
    private editServiceUrl = environment.url + 'items/';
    private getServicesUrl = environment.url + 'items/search/findItemByResto?restoId=';
    private servicesByProIDUrl = environment.url + 'items/search/findItemByResto?restoId=';
    private addCategoryOfServiceUrl = environment.url + 'items/category';
    private deleteCategoryOfServiceUrl = environment.url + 'items/category/';

    constructor(private http: HttpClient, private authService: AuthService) {
    }

    createItem(item: ItemModel, files) {
        const formdata = new FormData();
        if (item.id) {
            formdata.append('id', item.id);
        }
        formdata.append('restoId', item.restoId);
        formdata.append('categoryId', item.categoryId.toString());
        formdata.append('description', item.description);
        formdata.append('name', item.name);
        formdata.append('price', item.price.toString());
        formdata.append('promo', item.promo ? 'true' : 'false');
        formdata.append('reduction', item.promo ? item.reduction.toString() : '0');
        for (const file of files) {
            formdata.append('medias', file);
        }

        return this.http.post(this.createUrl, formdata);
    }

    getItems() {
        return this.http.get<ItemModel[]>(this.getServiceUrl);
    }

    getItem(id) {
        return this.http.get<ItemModel>(this.getServiceUrl + id);
    }

    Edit(item: ItemModel, files) {
        const formdata: FormData = new FormData();
        formdata.append('restoId', item.restoId);
        formdata.append('description', item.description);
        formdata.append('name', item.name);
        formdata.append('price', item.price.toString());
        formdata.append('promo', item.promo ? 'true' : 'false');
        formdata.append('reduction', item.promo ? item.reduction.toString() : null);
        for (let i = 0; i < files.length; i++) {
            formdata.append('medias', files[i]);
        }
        return this.http.patch(this.editServiceUrl + item.id, formdata);
    }

    delete(id) {
        return this.http.delete(this.removeServiceUrl + id);
    }

    getItemsByProID(id) {
        return this.http.get(this.servicesByProIDUrl + id);
    }

    addCategoryOfItem(categoryId, id) {
        return this.http.post(this.addCategoryOfServiceUrl, {categoryId, id});
    }

    deleteCategoryOfItem(itemId) {
        return this.http.delete(this.deleteCategoryOfServiceUrl + itemId);
    }

}
