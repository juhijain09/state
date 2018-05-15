import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MissionService } from '../../services';
import * as fromRoot from '../../reducers';
import { SearchChangeAction } from '../../actions';

@Component({
	selector: 'main-app',
  providers: [MissionService],
	templateUrl: './main.component.html',
	styleUrls: ['./main.component.css']
})

export class MainComponent {
	 public subscription: Subscription;
   public messageData;
   public searchterm$;
   public isCreateNodeVisible$;

   constructor(
    public store: Store<fromRoot.State>,
    private missionService: MissionService
  ) {
       this.searchterm$ = store.select(fromRoot.getSearchTerm);
       this.isCreateNodeVisible$ = store.select(fromRoot.getCreateNodeStatus);

   }
}
