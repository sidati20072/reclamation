import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class OrderService {
    private ordersUrl = environment.url + 'orders/all';
    private actionOrderUrl = environment.url + 'orders/action';
    constructor(private http: HttpClient) {
    }

    getOrders() {
        return this.http.get(this.ordersUrl);
    }

    setStatusDlvUserOrder(body) {
        return this.http.post(this.actionOrderUrl, body);
    }
}
