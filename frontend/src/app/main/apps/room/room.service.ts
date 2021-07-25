import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class RoomService {
    private urlRooms = environment.url + 'api/v1/rooms';
    private documentDownUrl = environment.url + 'documents/downloadRessource/';
    private documentUrl = environment.url + 'documents/';

    constructor(
        private _httpClient: HttpClient
    ) {
    }

    getRooms() {
        return this._httpClient.get(this.urlRooms);
    }

    save(room) {
        return this._httpClient.post(this.urlRooms, room);
    }

    delete(id) {
        return this._httpClient.delete(this.urlRooms + '/' + id);
    }

    addDocument(selectedFiles: FileList, type: any, id: number) {
        const formData: FormData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('documents', selectedFiles[i]);
        }
        formData.append('documentType', type);

        return this._httpClient.post(this.urlRooms + '/' + id + '/documents', formData);
    }


    getDocument(id) {
        return this._httpClient.get(this.documentDownUrl + id);
    }

    deleteDocument(id) {
        return this._httpClient.delete(this.documentUrl + id);
    }
}
