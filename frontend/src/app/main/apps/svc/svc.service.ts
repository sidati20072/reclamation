import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class SvcService {
    private urlService = environment.url + 'api/v1/svc';

    constructor(
        private _httpClient: HttpClient
    ) {}

    getAll() {
        return this._httpClient.get(this.urlService);
    }

    save(data) {
        return this._httpClient.post(this.urlService, data);
    }

    delete(id) {
        return this._httpClient.delete(this.urlService + '/' + id);
    }

}
