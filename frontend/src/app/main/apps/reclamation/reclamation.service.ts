import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ReclamationModel} from './reclamation.model';
@Injectable({
    providedIn: 'root'
})
export class ReclamationService {
    private urlReclamations = environment.url + 'reclamations';
    private documentDownUrl = environment.url + 'documents/downloadRessource/';
    private documentUrl = environment.url + 'documents/';

    constructor(
        private _httpClient: HttpClient
    ) {
    }

    getReclamations() {
        return this._httpClient.get(this.urlReclamations);
    }

    save(reclamation: ReclamationModel) {
        return this._httpClient.post(this.urlReclamations, reclamation);
    }

    delete(id) {
        return this._httpClient.delete(this.urlReclamations + '/' + id);
    }

    addDocument(selectedFiles: FileList, type: any, id: number) {
        const formData: FormData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('documents', selectedFiles[i]);
        }
        formData.append('documentType', type);

        return this._httpClient.post(this.urlReclamations + '/' + id + '/documents', formData);
    }

    getReclamation(id: any) {
        return this._httpClient.get(this.urlReclamations + '/' + id);
    }

    getDocument(id) {
        return this._httpClient.get(this.documentDownUrl + id);
    }

    deleteDocument(id) {
        return this._httpClient.delete(this.documentUrl + id);
    }
}
