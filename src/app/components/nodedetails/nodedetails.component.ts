import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import * as fromRoot from '../../reducers';
import { ShowNodeDetailsAction } from '../../actions';

@Component({
  selector: 'node-details',
  templateUrl: './nodedetails.component.html',
  styleUrls: ['./nodedetails.component.css']
})

export class NodeDetailsComponent {
   @Input() public currentNode;
   @Input() public childData;
   @Input() public messageData;
   public searchResult$;
   public currentNode$;
   public cachedCurrentNode = this.currentNode;
   public isNodeDetailsVisible$;


  constructor(
    public store: Store<fromRoot.State>
  ) {
    this.searchResult$ = store.select(fromRoot.getSearchResult);
    this.currentNode$ = this.store.select(fromRoot.getExpandResult);
    this.isNodeDetailsVisible$ = store.select(fromRoot.getNodeStatus);
  }

  public hideNodeDetails(e) {
     // e.preventDefault();
    this.store.dispatch(new ShowNodeDetailsAction(false));
  }

}
