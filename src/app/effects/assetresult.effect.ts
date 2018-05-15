import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { UpdateSearchResultAction, SEARCH_CHANGE, ErrorStatusAction } from '../actions';
import { AssetDataService } from '../services';

@Injectable()
export class AssetResultEffect {
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(SEARCH_CHANGE)
        .map(toPayload)
        .switchMap((payload) =>
            this.assetService
                .getAssetByName(payload)
                .map(data => {
                    console.log('data:AssetResultEffects:-', data);
                    return new UpdateSearchResultAction(data);
                     }).catch(error => of(new ErrorStatusAction(error.error)))
                    
        );
    constructor(
        private assetService: AssetDataService,
        private actions$: Actions
    ) {}
}
