import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';
import { MatSnackBarModule, MatSnackBar } from '@angular/material';
import { AlertComponent } from 'app/main/apps/contacts/alert/alert.component';

@Injectable({
  providedIn: 'root'
})
export class ReviewsService {

    constructor(private http : HttpClient,
        private _snackBar: MatSnackBar) { }
  
    getAllreviews(){
        return this.http.get(environment.url + 'reviews');
    }
    getReviewsByPro(proid){
        return this.http.get(environment.url + 'reviews/pro/' + proid);
    }
    getCategory(){
        return this.http.get(environment.url + 'categories/');
    }
    changeEtat(id, enabled){
        const reviewtUpt = {
            enabled : Boolean,
        };
        reviewtUpt.enabled = enabled;
        this.http.patch(environment.url + 'reviews/' + id, reviewtUpt).
        subscribe(response => {
            this._snackBar.openFromComponent(AlertComponent, {
                duration: 3 * 1000,
              });
        });
    }
    getPro(){
        return this.http.get(environment.url + 'users/');
    }
}
