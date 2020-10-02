import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {MatSnackBar} from '@angular/material';
import {AlertComponent} from '../contacts/alert/alert.component';

@Injectable()
export class CategoryService implements Resolve<any> {
    onCategoryChanged: BehaviorSubject<any>;
    subCatChanged: BehaviorSubject<any>;
    id: any;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _snackBar: MatSnackBar
    ) {
        // Set the defaults
        this.onCategoryChanged = new BehaviorSubject({});
        this.subCatChanged = new BehaviorSubject({});

    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.id = route.params.catId;
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCategory(route.params.catId),
                this.getsubCat(route.params.catId)
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get category
     *
     * @param catId
     * @returns {Promise<any>}
     */
    getCategory(catId): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.url + 'categories/' + catId)
                .subscribe((response: any) => {
                    this.onCategoryChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    getsubCat(catId): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.url + 'categories/' + catId)
                .subscribe((response: any) => {
                    this.subCatChanged.next(response.categories);
                    resolve(response);
                }, reject);
        });
    }


    addsubCategories(name, desc, file, parent): Promise<any> {
        const formdata: FormData = new FormData();

        formdata.append('name', name);
        formdata.append('description', desc);
        formdata.append('parent', this.id);
        formdata.append('image', file);

        return new Promise((resolve, reject) => {

            this._httpClient.post(environment.url + 'categories/create', formdata)
                .subscribe((response: any) => {
                    this.getsubCat(this.id);
                    resolve(response);
                    this._snackBar.openFromComponent(AlertComponent, {
                        duration: 3 * 1000,
                    });
                }, reject);
        });
    }

    deleteSubCategorie(id): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.delete(environment.url + 'categories/' + id)
                .subscribe((response: any) => {
                    this.getsubCat(this.id);
                    resolve(response);
                    this._snackBar.openFromComponent(AlertComponent, {
                        duration: 3 * 1000,
                    });
                }, reject);
        });
    }

    editCategorie(id, data): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.patch(environment.url + 'categories/' + id, data)
                .subscribe((response: any) => {
                    this.onCategoryChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    editSubCategorie(id, data): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.patch(environment.url + 'categories/' + id, data)
                .subscribe((response: any) => {
                    resolve(response);
                    this._snackBar.openFromComponent(AlertComponent, {
                        duration: 3 * 1000,
                    });
                }, reject);
        });
    }

    changeCategoryImg(id, image): Promise<any> {
        const formdata: FormData = new FormData();
        formdata.append('id', id);
        formdata.append('image', image);

        return new Promise((resolve, reject) => {


            this._httpClient.post(environment.url + 'categories/image', formdata)
                .subscribe((response: any) => {
                    this.onCategoryChanged.next(response);
                    this.getsubCat(this.id);
                    resolve(response);

                }, reject);
        });
    }

    changeSubCategoryImg(id, image): Promise<any> {
        const formdata: FormData = new FormData();
        formdata.append('id', id);
        formdata.append('image', image);

        return new Promise((resolve, reject) => {


            this._httpClient.post(environment.url + 'categories/image', formdata)
                .subscribe((response: any) => {
                    this.getsubCat(this.id);
                    resolve(response);
                }, reject);
        });
    }


}
