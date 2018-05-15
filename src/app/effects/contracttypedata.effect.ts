import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {
    UpdateContractTypeDataAction,
    GET_DATA_CONTRACTTYPE,
    ToggleGenerateCodeAction,
    ResponseStatusAction
} from '../actions';

import { LicenseDataService } from '../services';

@Injectable()
export class ContractTypeDataEffect {

    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(GET_DATA_CONTRACTTYPE)
        .switchMap(() =>
            this.licenseDataService
                .getContractTypeData()
                .mergeMap(data => {
                    if (data) {
                      // this.orgGuid = data.org[0].guid;
                      console.log('Contracttype data', data);
                        return [
                            new UpdateContractTypeDataAction(data)
                        ];
                    } else {
                        return ;
                    }
                }).catch(error => of(new ResponseStatusAction(error.error)))
        );
        constructor(
        private licenseDataService: LicenseDataService,
        private actions$: Actions
    ) {}
}
