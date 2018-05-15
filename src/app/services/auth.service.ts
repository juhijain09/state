import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import { _throw } from 'rxjs/observable/throw';
import { Md5 } from 'ts-md5/dist/md5';
import { User, Authenticate } from '../models';
// import { HttpDataService } from './helperServices';
import {
    ENVIRONMENT,
    PrivateLogin,
    AppKeys
  } from '../constant';

@Injectable()
export class AuthService {
  constructor(
    private http: HttpClient
    ) {}

  login({ userid, password }: Authenticate) {
    if (ENVIRONMENT === 'local') {
      return this.http.get<any>(PrivateLogin).map((data: any) => {
        if (data.status === 'success') {
          return { loggedIn: true, user: data.result.userid };
        } else {
          return { loggedIn: false, user: null };
        }
      });
    } else {
      // let headers = new HttpHeaders();
      // headers = headers.set('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
      // const payload = {
      //   appid: AppKeys.main,
      //   password: Md5.hashStr(password).toString(),
      //   userid
      // }
      const formData = new FormData();
      formData.append('appid', AppKeys.main);
      formData.append('password', Md5.hashStr(password).toString());
      formData.append('userid', userid);
      return this.http.post<any>(PrivateLogin, formData).map((data: any) => {

        if (data.status === 'success') {
          return { loggedIn: true, user: data.result.userid };
        } else {
          return { loggedIn: false, user: null };
        }
      });
    }

  }

  logout() {
    return of(true);
  }
}


