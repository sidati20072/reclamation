import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../environments/environment';
import {ContractModel} from './contract.model';

@Injectable({
    providedIn: 'root'
})
export class ContractService {
    private urlContract = environment.url + 'contract';
    private documentDownUrl = environment.url + 'documents/downloadRessource/';
    private documentUrl = environment.url + 'documents/';

    constructor(
        private _httpClient: HttpClient
    ) {
    }

    getContract() {
        return this._httpClient.get(this.urlContract);
    }


    save(reclamation: ContractModel) {
        return this._httpClient.post(this.urlContract, reclamation);
    }

    delete(id) {
        return this._httpClient.delete(this.urlContract + '/' + id);
    }

    addDocument(selectedFiles: FileList, type: any, id: number) {
        const formData: FormData = new FormData();

        for (let i = 0; i < selectedFiles.length; i++) {
            formData.append('documents', selectedFiles[i]);
        }
        formData.append('documentType', type);

        return this._httpClient.post(this.urlContract + '/' + id + '/documents', formData);
    }

    getcontract(id: any) {
        return this._httpClient.get(this.urlContract + '/' + id);
    }

    getDocument(id) {
        return this._httpClient.get(this.documentDownUrl + id);
    }

    deleteDocument(id) {
        return this._httpClient.delete(this.documentUrl + id);
    }


}
