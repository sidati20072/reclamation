import { Injectable } from '@angular/core';
import {JwtHelperService} from '@auth0/angular-jwt';
import {UserService} from './user.service';
import { HttpClient } from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private iss = {
    login: environment.url + 'login',
  };
  username: string;
  name: string ;
  mail: string ;
  logo: string ;
  admin = false;
  pro = false;
  client = false;
  loggedIn = false;


  constructor(private userService: UserService, private _httpClient: HttpClient) { }

  handle(token){
    this.set(token);
    this.setloggedIn(true);
    this.parseJWT();
  }

  set(token){
    localStorage.setItem('token', token);
  }

  get(){
    return localStorage.getItem('token')
  }

  remove(){
    this.admin = false;
    this.loggedIn = false;
    localStorage.removeItem('token');
    localStorage.clear();
    localStorage.setItem('isLogged', 'false');
    localStorage.setItem('isAdmin', 'false');
  }

  setloggedIn(value: boolean) {
    this.loggedIn = value;
        localStorage.setItem('isLogged', 'true');
  }

  parseJWT(){
    let jwtHelper = new JwtHelperService();
    let objJWT = jwtHelper.decodeToken(this.get());
    this.username = objJWT.sub;
    localStorage.setItem('username', objJWT.sub);
    let pos = objJWT.roles.map(function(e) { return e.authority; }).indexOf('ADMIN');
    if (pos >= 0){
        this.admin = true;
        localStorage.setItem('isAdmin', 'true');
    }
    let posP = objJWT.roles.map(function(e) { return e.authority; }).indexOf('PRO');
    if (posP >= 0){
        this.pro = true;
    }
    let posC = objJWT.roles.map(function(e) { return e.authority; }).indexOf('CLIENT');
    if (posC >= 0){
        this.client = true;
    }
     this._httpClient.get(environment.url + 'users')
                    .subscribe((response: any) => {
                        for (let admin of response._embedded.users) {
                            if (admin.username == objJWT.sub){
                                localStorage.setItem('idCurrent', admin.id);
                                this.setName(admin.nom, admin.prenom)
                                this.setMail(admin.email)
                                this.setlogo(admin.logo)
                                localStorage.setItem('name', admin.nom +' '+ admin.prenom);
                                localStorage.setItem('mail', admin.email);
                                localStorage.setItem('logo', admin.logo.link);

                            }
                        }
                    });
                    

     }


     setName(n, p){
        this.name = n + " " + p;
        }
        setMail(m){
            this.mail = m;
            }
            setlogo(m){
                this.logo = m;
                }
}
