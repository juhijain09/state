import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';

import {
    UpdateParentDataAction,
    GetChildDataAction,
    GET_ACCOUNT_PARENT,
    GetContractTypeDataAction
} from '../actions';

import { AssetDataService } from '../services';

@Injectable()
export class ParentDataEffect {
    public orgGuid;
    public ParentGuid;
    public classData = [];

    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(GET_ACCOUNT_PARENT)
        .switchMap(() =>
            this.assetService
                .getParent()
                .mergeMap(data => {
                    if (data) {
                      // this.orgGuid = data.org[0].guid;
                      this.classData = data.class[0];
                      this.ParentGuid = data.class[0].guid;
                      console.log('classData', this.classData);
                        return [
                            new UpdateParentDataAction(data),
                            // new UpdateParentDataAction(this.classData),
                            new GetChildDataAction(this.ParentGuid)
                        ];
                    }
                })
        );

    constructor(
        private assetService: AssetDataService,
        private actions$: Actions
    ) {}
}
