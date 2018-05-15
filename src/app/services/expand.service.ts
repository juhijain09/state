import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import {
    ENVIRONMENT,
    ExpendNode,
    AppKeys
  } from '../constant';
import 'rxjs/add/operator/map';

import { ExpandNode } from '../models';

@Injectable()
export class ExpandDataService {
    public status$;
    public user;
    public OrgId;
    public appName$;
    public appid;
    public appName;
    // public childClass$;

    constructor(private http: HttpClient,
                public store: Store<fromRoot.State>) {

        this.status$ = store.select(fromRoot.getStatus);
        this.status$.subscribe((status) => {
        this.user = status.user;
    });
        this.appName$ = store.select(fromRoot.getApplicationName);
        this.appName$.subscribe((data) => {
            this.appid = data;
            if (this.appid !== '') {
                console.log('application name:--', this.appid);
                this.appName = this.appid;
            } else {
                this.appName = AppKeys.main;
            }
        });
    //  this.childClass$ = this.store.select(fromRoot.getExpandResult);
    //  this.childClass$.subscribe((data) => {
    //   console.log("parentData:-", data);
    //  this.OrgId = data.guid;
    // });
    }

    public setRequestObject(apiUrl, payload) {
    let requestObj;

    if ( ENVIRONMENT === 'local' ) {
      requestObj = this.http.get(apiUrl);
    } else {
      requestObj = this.http.post(apiUrl, payload);

    }
    return requestObj;
  }

    getExpandResult(id): Observable<ExpandNode[]> {
        const appId = this.appName;
        const userId = this.user;
        const guid = id;
        const pageOffset = 0;
        const payload = { appId, userId, pageOffset, guid };
        const apiUrl = `${ExpendNode}/?appId=${appId}&id=${guid}&userId=${userId}&pageOffset=0`;
        console.log('from expand service:-', payload , apiUrl);
        return this.http.get<any>(apiUrl).map(data => {
          console.log('mydata:-', data);
                const nodeList = data.result.nodes.list;
                 const result = [];
                 const x = nodeList.map( o => {
                     return {
                          name: o.child.name,
                          guid: o.child.guid,
                          label: o.child.label
                     };
                    });
            console.log('getasset by name:-', data);
            console.log('returndata:-', x);
            return x;
        });

    }
}

