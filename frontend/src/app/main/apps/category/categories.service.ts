import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ActivatedRouteSnapshot, Resolve, RouterStateSnapshot} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';
import {environment} from '../../../../environments/environment';
import {MatSnackBar} from '@angular/material';
import {AlertComponent} from '../contacts/alert/alert.component';
import {UserService} from '../../../Services/user.service';

@Injectable()
export class CategoriesService implements Resolve<any> {
    onCategoriesChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _snackBar: MatSnackBar,
        private userService: UserService
    ) {
        // Set the defaults
        this.onCategoriesChanged = new BehaviorSubject({});
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
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCategories(),
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get categories
     *
     * @returns {Promise<any>}
     */
    async getCategories(): Promise<any> {
        const currentUser = await this.userService.getCurrentUser();
        return new Promise((resolve, reject) => {
            this._httpClient.get(environment.url + 'categories/parents/' + currentUser.id)
                .subscribe((response: any) => {
                    this.onCategoriesChanged.next(response);
                    resolve(response);
                }, reject);
        });
    }

    addCategories(name, desc, file, parent): Promise<any> {
        const formdata: FormData = new FormData();

        formdata.append('name', name);
        formdata.append('description', desc);
        formdata.append('parent', parent);
        formdata.append('image', file);

        return new Promise((resolve, reject) => {

            this._httpClient.post(environment.url + 'categories/create', formdata)
                .subscribe((response: any) => {
                    this.getCategories();
                    resolve(response);
                    this._snackBar.openFromComponent(AlertComponent, {
                        duration: 3 * 1000,
                    });
                }, reject);
        });
    }

    deleteCategorie(id): Promise<any> {
        return new Promise((resolve, reject) => {

            this._httpClient.delete(environment.url + 'categories/' + id)
                .subscribe((response: any) => {
                    this.getCategories();
                    resolve(response);
                    this._snackBar.openFromComponent(AlertComponent, {
                        duration: 3 * 1000,
                    });
                }, reject);
        });
    }

}
