import { Injectable, NgModule} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { RequestOptions, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/switchMap';
import * as fromRoot from '../reducers';
import {
    ENVIRONMENT,
    CreateNodeUrlObj,
    AppKeys,
    ContractTypeApi,
    GenerateQrCode,
    OrgAssetsApi,
    ProductRegistration,
    CreateLicenseTerm,
    CreateAccountToken,
    CreateAccount,
    ContractAssociate
} from '../constant';
import 'rxjs/add/operator/map';
import {
    ContractTypeData,
    ExpandNode
} from '../models';

@Injectable()
export class LicenseDataService {
    public status$;
    public appName$;
    public appid;
    public user;
    public appName;
    public selectedNode;
    public principalGuid;
    public currentNode$: Observable<ExpandNode>;
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

    getContractTypeData(): Observable<ContractTypeData> {
        const appId = this.appName;
        const apiUrl = `${ContractTypeApi}/?appId=${appId}&userId=`;
        console.log('getCon:-', apiUrl);
        return this.http.get<any>(apiUrl).map(data => {
            console.log('ContractType:-', data);
            return data.result;
        });
    }

    createLicenseTerm(payload): Observable<{}> {
        const appId = this.appName;
        const apiUrl = `${CreateLicenseTerm}/?appId=${appId}`;
        console.log('api url', apiUrl);
        return this.setRequestObject(apiUrl, payload).map(data => {
             console.log('create license data', data);
             return data.result;
        });
    }

    productRegister(payload): Observable<{}> {
        const appId = this.appName;
        const apiUrl =  `${ProductRegistration}/?appId=${appId}`;
        return this.setRequestObject(apiUrl, payload).map(data => {
            console.log('Product register', data);
            return data;
        });

    }

    generateQRCode(payload): Observable<{}> {
        const appId = this.appName;
        const apiUrl = `${GenerateQrCode}/?appId=${appId}`;
        console.log('getCode:-', apiUrl);
        console.log('payload ', payload);
        return this.setRequestObject(apiUrl, payload).map(res => {
            console.log('response from generateqrcode:-', res);
            return res;
        });
    }

    generateAccountToken(payload): Observable<{}> {
        const appId = this.appName;
        const apiUrl = `${CreateAccountToken}/?appId=${appId}`;
        if (payload.isPrincipalIdExist) {
            return this.setRequestObject(apiUrl, payload)
                .map(res => res)
                .switchMap(data => {
                    if ( data.status === 'success') {
                        console.log('in res.status:-', data.status);
                        const api = `${ContractAssociate}/?appId=${appId}`;
                        payload.token = data.result;
                        payload.principalId = payload.principalBId;
                        return this.setRequestObject(api, payload).map( dat => {
                            console.log('resuling data' , dat);
                            return dat;
                        });
                    } else {
                    }
                }).map(res => res);
        } else {
            return this.setRequestObject(apiUrl, payload).map(res => {
                console.log('response from generatetokencode:-', res);
                return res;
                });
        }
    }

    signup(payload): Observable<{}> {
        const appId = this.appName;
        const apiUrl = `${CreateAccount}/?appId=${appId}`;
        return this.setRequestObject(apiUrl, payload).map(res => {
           console.log('response from signup:-', res);
            return res;
        });
    }
}
