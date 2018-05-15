import { Injectable, NgModule} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import {
    ENVIRONMENT,
    SearchAsset,
    ParentApi,
    ChildClasses,
    CreateNodeUrlObj,
    AppKeys,
    CreateAssociation,
    UserOrg,
    GetProperties
  } from '../constant';
import 'rxjs/add/operator/map';
import {
    SearchNode,
    ParentData,
    NewNode,
    PrincipalNode,
    ExpandNode
} from '../models';



@Injectable()
export class AssetDataService {
    public status$;
    public user;
    public selectedNode;
    public principalGuid;
    public appName$;
    public appid;
    public appName;
    public currentNode$: Observable<ExpandNode>;
    public parentNode$: Observable<ParentData>;
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
        this.parentNode$ = this.store.select(fromRoot.getParentData);
          // this.parentNode$.subscribe((data) => {
          //     if(data.class){
          //        this.guid = data.class[0].guid;           
          //     }
          //   });
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

    getAssetByName(term): Observable<SearchNode[]> {
        const query = `name|${term}`;
        const appId = this.appName;
        const userId = this.user;
        const payload = {query, appId, userId};
        console.log('payload:-', payload);
        const requestObj = this.setRequestObject(SearchAsset, payload);
        return requestObj.map(data => {
            const x = data.result.map(o => {
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

    getParent(): Observable<ParentData> {
        const appId = this.appName;
        const apiUrl = `${ParentApi}/?appId=${appId}`;
        console.log('getPa:-', apiUrl);
        return this.http.get<any>(apiUrl).map(data => {
            console.log('myParent:', data);
            return data.result;
        });
    }
    /*getProperties(): Observable<ParentData> {
        const appId = this.appName;
        // const id = this.guid;
        // const payload ={appId, id};
        const requestObj = this.setRequestObject(GetProperties, payload);
        return requestObj.map(data => {          
            return data.result;
        });
    }*/

// create a post request to create new node
    createNewNode(payload): Observable<{}> {
        const appId = this.appName;
        const apiUrl = CreateNodeUrlObj[payload.type] + `?appId=${appId}`;
        if (payload.type === 'AdminUnit') {
            return this.http.post<any>(apiUrl, payload).map(res => {
            console.log('responseassoc:-', res);
            const resAd = {
                            status : 'success',
                            result : res.result.result[1]
                          };
            return resAd;
        });
          }else { return this.http.post<any>(apiUrl, payload).map(res => {
              console.log('retun res', res);
                   return res;
                   });
 }

    }

    getUserOrg(): Observable<{}> {
        const appId = this.appName;
        const apiUrl = `${UserOrg}/?appId=${appId}`;
        return this.http.get<any>(apiUrl).map(res => {
            return res;
        });
    }

     createPrincipalAssociation(data): Observable<PrincipalNode> {
        const appId = this.appName;
        const apiUrl = CreateNodeUrlObj['Association'] + `?appId=${appId}`;
        const payload = {
                    principalGuid: data.object.guid,
                    label: 'principal', // check from oldadminapp
                    adminUnitGuid: data.guid
                };
        return this.http.post<any>(apiUrl, payload).map(res => {
            console.log('retun res', res);
            return res;
        });
    }

    validatePrincipal(data): Observable<PrincipalNode> {
        const appId = this.appName;
        const apiUrl = CreateNodeUrlObj['Validation'] + `?appId=${appId}`;
         const payload = {
                    principalId: data.principalId // principal_id
                };
        return this.http.post<any>(apiUrl, payload).map(res => {
            return res;
        });
    }

    createDIEventAssociation(data): Observable<{}> {
        const appId = this.appName;
        const apiUrl = CreateNodeUrlObj[data.type] + `?appId=${appId}`;
          const payload = {
                            dataItem: [data.object.guid], // for di association
                            event: [data.object.guid], // for eventassociation
                            label: 'product_class',// check from oldadminapp
                            classGuid: data.classGuid
                          };

        return this.http.post<any>(apiUrl, payload).map(res => {
            return res;
        });
    }

    createDIAggAssociation(data): Observable<{}> {
        const appId = this.appName;
        const apiUrl = CreateNodeUrlObj[data.type] + `?appId=${appId}`;
          const payload =  {
                    dataItem: [{guid: data.guid, // how to get these values
                              avg: [{min: []},
                                  { max: []},
                                  { mean: []}
                                     ]
                                 }
                              ],

                    label: 'product_class', // check from oldadminapp
                    classGuid: data.classGuid
                };
        return this.http.post<any>(apiUrl, payload).map(res => {
            return res;
        });
    }
 }
