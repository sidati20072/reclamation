import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class CupboardService {

  private url = environment.url + 'api/v1/cupboards/';

  constructor(
      private _httpClient: HttpClient
  ) {
  }

  getRoomCupboard(id) {
    return this._httpClient.get(this.url + 'room/' + id);
  }

  save(data) {
    return this._httpClient.post(this.url, data);
  }
}
