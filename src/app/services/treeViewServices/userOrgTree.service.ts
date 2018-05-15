import { Injectable, NgModule} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { TreeviewItem } from '../../models';

import {
    ENVIRONMENT,
    UserOrg,
    AppKeys
  } from '../../constant';
import 'rxjs/add/operator/map';

@Injectable()
export class UserOrgTreeService {
    constructor(private http: HttpClient) {}

    public setRequestObject(apiUrl, payload) {
        let requestObj;

        if ( ENVIRONMENT === 'local' ) {
          requestObj = this.http.get(apiUrl);
        } else {
          requestObj = this.http.post(apiUrl, payload);
        }
        return requestObj;
    }
    getUserOrg(): Observable<{}> {
         const appId = AppKeys.main;
         const apiUrl = `${UserOrg}/?appId=${appId}`;
         return this.http.get(apiUrl).map((data: any) => {
               const res = data.result.map(o => {
                return {
                    text: new String(o.name),
                    value: o.guid,
                };
            });
                return { text: 'Org', children: res };
        });
    }
}
