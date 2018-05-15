import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload  } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { AccountTokenAction,
         GENERATE_ACCOUNT_TOKEN,
         UpdateTokenAction,
         UPDATE_ACCOUNT_TOKEN,
         ResponseStatusAction
} from '../actions';
import { LicenseDataService } from '../services';
import {
    AppKeys,
    ContractAssociate
} from '../constant';


@Injectable()
export class AccountTokenEffect {
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(GENERATE_ACCOUNT_TOKEN)
        .map(toPayload)
        .switchMap((payload) => {
            return this.licenseDataService
                .generateAccountToken(payload)
                .mergeMap((data: any) => {
                      if (data) {
                           console.log('data:-', data.result);
                           return [new UpdateTokenAction(data)];
                     } else {
                     }
         }).catch(error => of(new ResponseStatusAction(error.error)));
    });
    constructor(
        private licenseDataService: LicenseDataService,
        private actions$: Actions
    ) {}
}
