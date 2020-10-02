import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AppconfigService {

    constructor(private http: HttpClient) {
    }

    getAppConfig() {
        return this.http.get(environment.url + 'appConfigs/1');
    }

    updateCondition(condition) {
        const conditionUpt = {
            appCondition: String,
        };
        conditionUpt.appCondition = condition;
        return this.http.patch(environment.url + 'appConfigs/1', conditionUpt);
    }

    updatePresentation(presentation) {
        const presentationUpt = {
            appPresentation: String,
        };
        presentationUpt.appPresentation = presentation;
        return this.http.patch(environment.url + 'appConfigs/1', presentationUpt);
    }

    getAppConfigsMedia() {
        return this.http.get(environment.url + 'appConfigs/1/media ');
    }

    updateMedia(file) {
        const formdata: FormData = new FormData();
        formdata.append('media', file);
        return this.http.post(environment.url + 'appConfigs/media', formdata);
    }

    updateEmpN(number) {
        const empUpt = {
            limitEmp: String,
        };
        empUpt.limitEmp = number;
        return this.http.patch(environment.url + 'appConfigs/1', empUpt);
    }

    updateOffline(off, msg, closed) {
        const offlineUpt = {
            offline: Boolean,
            offlineMessage: String,
            closed: Boolean
        };
        offlineUpt.offline = off;
        offlineUpt.offlineMessage = msg;
        offlineUpt.closed = closed;
        return this.http.patch(environment.url + 'appConfigs/1', offlineUpt);
    }
}
