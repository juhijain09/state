import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router, ActivatedRoute } from '@angular/router';

import * as fromRoot from '../../reducers';
import { SearchNode } from '../../models';


@Component({
  selector: 'node-view',
  templateUrl: './nodeview.component.html',
  styleUrls: ['./nodeview.component.css'],
})
export class NodeviewComponent implements OnChanges {
    @Input() private messageData;
  public searchResult$: Observable<SearchNode[]>;
  public filter$;
  public searchterm$;
  public isCreateNodeVisible$;
  public isNodeDetailsVisible$;
  public nodeResult;
  public searchCachedData;
  public label = [];

 constructor(
    public store: Store<fromRoot.State>
  ) {
    this.searchterm$ = store.select(fromRoot.getSearchTerm);
    this.searchResult$ = store.select(fromRoot.getSearchResult);
    this.searchResult$.subscribe((data) => {
          // data.map(o => {
          //           this.label.push(o.label);
          // });
      /*this.label = data.result.label;*/
    });
    this.filter$ = store.select(fromRoot.getFilter);
    this.isCreateNodeVisible$ = store.select(fromRoot.getCreateNodeStatus);
    this.isNodeDetailsVisible$ = store.select(fromRoot.getCreateNodeStatus);

  }
  public ngOnChanges() {
    console.log('print search filter$:-', this.filter$);
  }
}
