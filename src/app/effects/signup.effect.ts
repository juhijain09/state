import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload  } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { SignupAction,
         SIGN_UP,
         SignupResultAction,
         ResponseStatusAction
} from '../actions';
import { LicenseDataService } from '../services';

@Injectable()
export class SignupEffect {
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(SIGN_UP)
        .map(toPayload)
        .switchMap((payload) => {
            return this.licenseDataService
                .signup(payload)
                .mergeMap((data: any) => {
                    console.log('signup Information:-', data);
                      if (data.status === 'success') {
                           return [
                               new SignupResultAction(data.result)
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
