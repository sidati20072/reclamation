import { Injectable } from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BoitierService {

  private url = environment.url + 'api/v1/boitiers/';

  constructor(
      private _httpClient: HttpClient
  ) {
  }

  getAll(id) {
    return this._httpClient.get(this.url + 'locker/' + id);
  }

  save(data) {
    return this._httpClient.post(this.url, data);
  }



}
