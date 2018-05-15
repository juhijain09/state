import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
// import { listChildNodesOnExpand } from '../parser';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { UpdateSearchResultAction, EXPAND_RESULT } from '../actions';
import { ExpandDataService } from '../services';

@Injectable()
export class ExpandResultEffects {
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(EXPAND_RESULT)
        .map(toPayload)
        .switchMap((payload) =>
            this.expandService
                .getExpandResult(payload.guid)
                .map(data => {
                    console.log('getExpandResult:-', data);
                 if (data) {
                    return new UpdateSearchResultAction(data);
                }
                })
        );

    constructor(
        private expandService: ExpandDataService,
        private actions$: Actions
    ) {}
}
