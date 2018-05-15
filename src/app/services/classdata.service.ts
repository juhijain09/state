import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { ParseDataForTreeView } from '../parser';
import * as _ from 'lodash';
import {
    ENVIRONMENT,
    ChildClasses,
    AppKeys,
    ChildOrg,
    DIClasses,

} from '../constant';
import * as fromRoot from '../reducers';
import 'rxjs/add/operator/map';
import { ChildData } from '../models';

@Injectable()
export class ClassDataService {
    public appName$;
    public appid;
    public appName;
    constructor (
        private http: HttpClient,
        public store: Store<fromRoot.State>
        ) {
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
    }

    getChildClasses(guid): Observable<ChildData> {
        const appId = this.appName;
        const apiUrl = `${ChildClasses}?id=${guid}&appId=${appId}`;
        console.log('getchildurl:-', apiUrl);
        return this.http.get<any>(apiUrl).map(data => {
            const x = data.result.nodes.map(o => {
                return {
                    name: o.name,
                    guid: o.guid,
                    label: o.label,
                    view: true
                };
            });
            return x;
        });
    }
    getDIClasses(): Observable<{}> {
        const appId = this.appName;
        const apiUrl = `${DIClasses}?appId=${appId}`;
        console.log('getDIurl:-', apiUrl);
        return this.http.get<any>(apiUrl).map(data => {
             return data;
        });
    }

      getChildOrg(guid): Observable<{ChildData}> {
        const appId = this.appName;
        const apiUrl = `${ChildOrg}?appId=${appId}`;
        console.log('getchildurl:-', apiUrl);
        return this.http.get<any>(apiUrl).map(data => {
            const x = data.result.nodes.map(o => {
                return {
                    name: o.name,
                    guid: o.guid,
                    label: o.label,
                    view: true
                };
            });
            return x;
        });
    }
}
