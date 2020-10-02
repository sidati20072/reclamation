import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {AuthService} from '../../../../Services/auth.service';
import {UserService} from '../../../../Services/user.service';

@Injectable({
  providedIn: 'root'
})
export class ResetServiceService {
    host = environment.url ;

  constructor(private httpClient: HttpClient, private authService: AuthService, private userService: UserService) {
  }

  getUserByToken(token){
    return this.httpClient.get<any>(this.host + 'users/search/findByResetToken?resetToken=' + token);
}

  resetPassword(password, token){
  const data = {
    newpassword: password.password,
    token : token
  };
console.log(data);
    return this.httpClient.post(this.host + 'reset' , data);
  }

}
