import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload  } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import { Store } from '@ngrx/store';
import * as fromRoot from '../reducers';
import { ExpandNode } from '../models';

import { CreateNodeResultAction,
         CREATE_NEW_NODE,
         CREATE_NEW_PRINCIPAL,
         ToggleCreateNodeAction,
         ExpandResultAction,
         ResponseStatusAction
} from '../actions';
import { AssetDataService } from '../services';

@Injectable()
export class CreateNewNodeEffect {
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(CREATE_NEW_NODE)
        .map(toPayload)
        .switchMap((payload) => {
            return this.assetService
                .createNewNode(payload)
                .mergeMap((data: any) => {
                    console.log('data:createnode:-', data);
                      if (data.status === 'success' ) {
                           return [
                               new ToggleCreateNodeAction(false),
                               new ExpandResultAction(data.result)// data.result in prod
                               // ExpandResetAction on confirm
                               ];
                     } else {
                       // return[new ToggleCreateNodeAction(false)];
                       // TODO node not created ... show error to user
                     }
                }).catch(error => of(new ResponseStatusAction(error.error)));
        }
     );


    constructor(
        private assetService: AssetDataService,
        private actions$: Actions
    ) {}
}
