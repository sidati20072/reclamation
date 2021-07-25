import {Injectable} from '@angular/core';
import {environment} from '../../../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {DocumentModel} from './room.model';

@Injectable({
    providedIn: 'root'
})
export class DocumentService {

    private url = environment.url + 'api/v1/documents/';

    constructor(
        private _httpClient: HttpClient
    ) {
    }

    getBoitierDocs(id) {
        return this._httpClient.get(this.url + 'boitier/' + id);
    }

    save(id, data) {
        return this._httpClient.post(this.url + 'upload/' + id, data);
    }

    getDocument(id) {
        return this._httpClient.get(this.url + 'downloadRessource/' + id);
    }

    update(doc: DocumentModel) {
        return this._httpClient.patch(this.url + doc.id, doc);
    }

    move(data) {
        return this._httpClient.post(this.url + 'move', data);
    }

    getAll() {
        return this._httpClient.get(this.url);
    }
}
