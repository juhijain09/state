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
         CREATE_NEW_DATAITEM,
         ToggleCreateNodeAction,
         ExpandResultAction,
         ResponseStatusAction
} from '../actions';
import { AssetDataService } from '../services';

@Injectable()
export class CreateDataItemEffect {
      public currentNode$: Observable<ExpandNode>;
      public CreateNodeLabel$;
      public isAggregateChecked$;
      public selectedNode;
      public label;
      public isChecked;
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(CREATE_NEW_DATAITEM)
        .map(toPayload)
        .switchMap((payload) => {
            console.log('data:createnode inside di node:-', );
            return this.assetService
                .createNewNode(payload)
                .mergeMap((data: any) => {
                    console.log('data:createnode inside di node:-', data);
                    if (data) {
                      // TODO for aggregate data
                      // if(this.isChecked){
                      //     const classGuid = this.selectedNode;
                      //     const payload= data.result;
                      //     const type = this.label;
                      // }
                        const classGuid = this.selectedNode;
                        const object = data.result.node;
                        const type = this.label + 'Association';
                        console.log('di label:-', type);
                         return this.assetService
                         .createDIEventAssociation({object, classGuid, type})
                             .mergeMap(() => {
                                if (data) {
                                    return[ new ToggleCreateNodeAction(false),
                                            new ExpandResultAction(data.result)];
                                } else { }
                             }).catch(error => of(new ResponseStatusAction(error.error)));
                          }
                    }).catch(error => of(new ResponseStatusAction(error.error)));
        });


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
        this.CreateNodeLabel$ = store.select(fromRoot.getCreateNodeLabel);
        this.CreateNodeLabel$.subscribe((data) => {
          if (data) {
           this.label = data;
      }
    });
        this.isAggregateChecked$ = store.select(fromRoot.getAggregateBoxStatus);
        this.isAggregateChecked$.subscribe((data) => {
           if (data) {
           this.isChecked = data;
      }
    });

}
}
