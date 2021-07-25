import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LockerService {

  private url = environment.url + 'api/v1/lockers/';

  constructor(
      private _httpClient: HttpClient
  ) {
  }

  getCupboardLocker(id) {
    return this._httpClient.get(this.url + 'cupboard/' + id);
  }

  save(data) {
    return this._httpClient.post(this.url, data);
  }



}
