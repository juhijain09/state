import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload  } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';

import { UpdateQRCodeAction,
         GENERATE_QR_CODE,
         GenerateQrCodeAction,
         ExpandResultAction,
         ResponseStatusAction
} from '../actions';
import { LicenseDataService } from '../services';

@Injectable()
export class QRCodeEffect {
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(GENERATE_QR_CODE)
        .map(toPayload)
        .switchMap((payload) => {
            return this.licenseDataService
                .generateQRCode(payload)
                .mergeMap((data: any) => {
                    console.log('URL Information:-', data);
                      if (data.status === 'success') {
                           return [
                               new UpdateQRCodeAction(data.result)
                               ];
                      } else {}
                }).catch(error => of(new ResponseStatusAction(error.error)));
        });

    constructor(
        private licenseDataService: LicenseDataService,
        private actions$: Actions
    ) {}
}
