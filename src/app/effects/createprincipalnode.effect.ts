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

import {
         CREATE_NEW_PRINCIPAL,
         ToggleCreateNodeAction,
         ExpandResultAction,
         ResponseStatusAction
} from '../actions';
import { AssetDataService } from '../services';

@Injectable()
export class CreatePrincipalNodeEffect {
      public currentNode$: Observable<ExpandNode>;
      public selectedNode;
      public expandObj = {
                          guid : ''
                         };
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(CREATE_NEW_PRINCIPAL)
        .map(toPayload)
        .switchMap((payload) => {
            console.log('data:createnode inside principal node:-', );
            return this.assetService
                .createNewNode(payload)
                .mergeMap((data: any) => {
                    if (data) {
                        const guid = this.selectedNode;
                        const object = data.result;
                        this.expandObj.guid = this.selectedNode;
                          return this.assetService
                          .createPrincipalAssociation({object, guid})
                          .mergeMap((data: any) => {
                            if (data && data.status === 'success') {
                              return this.assetService
                              .validatePrincipal(data.result) // .validatePrincipal(data.result.node)
                               .mergeMap((data: any) => {
                                 if (data.result === 'valid') {
                                    return[  new ExpandResultAction(this.expandObj),
                                             new ToggleCreateNodeAction(false)
                                          ];
                                 }
                               });

                            }
                       }).catch(error => of(new ResponseStatusAction(error.error)));
                    }
                }).catch(error => of(new ResponseStatusAction(error.error)));
        }
     );


    constructor(
        private assetService: AssetDataService,
        private actions$: Actions,
        public store: Store<fromRoot.State>,
    ) { console.log('inside this');
        this.currentNode$ = this.store.select(fromRoot.getExpandResult);
        this.currentNode$.subscribe((data) => {
          if (data) {
            this.selectedNode = data.guid;
          }
        });
      }
}
