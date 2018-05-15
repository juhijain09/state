import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';

import { UpdateChildDataAction, GET_CLASS_CHILD } from '../actions';
import { ClassDataService, AssetDataService } from '../services';
import { ChildData } from '../models';

@Injectable()
export class ChildDataEffect {
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(GET_CLASS_CHILD)
        .map(toPayload)
        .switchMap((payload) => {
            return this.classDataService
                .getChildClasses(payload)
                .map((data) => {
                    if (data) {
                        return new UpdateChildDataAction(data);
                    }
                });
            }
        );

    constructor(
        private classDataService: ClassDataService,
        private actions$: Actions
    ) {}
}
