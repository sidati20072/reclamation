import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient, HttpHeaders, HttpRequest} from '@angular/common/http';
import {MediaModel} from '../models/MediaModel';

@Injectable({
  providedIn: 'root'
})
export class MediaService {

  host: string = environment.url + 'medias';
  reviewMediaUrl: string = environment.url + 'reviews';
  setLogoUrl: string = environment.url + 'medias/logo';

  constructor(private httpClient: HttpClient) { }

  deleteMedia(id) {
    const httpOptions = {
      headers: new HttpHeaders({
        //  'Authorization':  this.authService.jwt
      })
    };
    return this.httpClient.delete<any>(this.host + '/' + id, httpOptions);

  }

  uploadMedia(file: File , userId , type){
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Authorization': this.authService.jwt,
      })
    };

    const formdata: FormData = new FormData();

    formdata.append('file', file);
    formdata.append('userId', userId);
    formdata.append('type', type);

    const req = new HttpRequest('POST', this.host + '/upload', formdata , httpOptions);

    return this.httpClient.post<any>(this.host + '/upload', formdata , httpOptions);
  }

  uploadReviewMedia(media: File , userId , reviewId){
    const httpOptions = {
      headers: new HttpHeaders({
        // 'Authorization': this.authService.jwt,
      })
    };

    const formdata: FormData = new FormData();
    formdata.append('reviewId', reviewId);
    formdata.append('userId', userId);
    formdata.append('media', media);


    return this.httpClient.post<any>(this.reviewMediaUrl + '/upload', formdata , httpOptions);
  }

  setProLogo(idPro , idMedia){

    return this.httpClient.post<MediaModel>(this.setLogoUrl, {proId: idPro, mediaId: idMedia});
  }
}
