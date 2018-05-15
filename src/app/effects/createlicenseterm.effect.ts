import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload  } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { CreateLicenseResultAction,
         CREATE_LICENSE_RESULT,
         CREATE_LICENSE,
         CreateLicenseTermAction,
         ExpandResultAction,
         ToggleCreateNodeAction,
         ResponseStatusAction
} from '../actions';
import { LicenseDataService,
         AssetDataService
 } from '../services';

@Injectable()
export class CreateLicenseTermEffect {
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(CREATE_LICENSE)
        .map(toPayload)
        .switchMap((payload) => {
            return this.licenseDataService
                .createLicenseTerm(payload)
                .mergeMap((data: any) => {
                    console.log('license term data:-', data);
                      if (data.status === 'success') {
                           return [
                               new CreateLicenseResultAction(data.result),
                               new ExpandResultAction(data.result)
                               ];
                      } else {
                    }
                }).catch(error => of(new ResponseStatusAction(error.error)));
    });
    constructor(
        private licenseDataService: LicenseDataService,
        private actions$: Actions
    ) {}
}
