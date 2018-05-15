import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload  } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { ProductRegistrationAction,
         PRODUCT_REGISTER,
         UpdateProductRegistrationAction,
         PRODUCT_REGISTER_RESULT,
         ResponseStatusAction
 } from '../actions';
import { LicenseDataService } from '../services';

@Injectable()
export class ProductRegisterEffect {
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(PRODUCT_REGISTER)
        .map(toPayload)
        .switchMap((payload) => {
            return this.licenseDataService
                .productRegister(payload)
                .mergeMap((data: any) => {
                    // console.log('URL Information:-', data);
                      if (data.status === 'success') {
                           return [
                               new UpdateProductRegistrationAction(data)
                               ];
                     } else {}
                }).catch(error => of(new ResponseStatusAction(error.error)));
    });
    constructor(
       private licenseDataService: LicenseDataService,
       private actions$: Actions
    ) {}
}
