import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class DataTableService {

    public resourceUrl = environment.url + 'ui/config/datatable/';

    constructor(
        private http: HttpClient,
    ) {
    }

    getTableColumns(type: string): Observable<any> {
        return this.http.get(this.resourceUrl.concat(type).toString());
    }
}
