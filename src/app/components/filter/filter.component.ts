import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { MissionService } from '../../services';
import { FilterChangeAction } from '../../actions';
import * as fromRoot from '../../reducers';


@Component({
  selector: 'ng-filter',
  providers: [ MissionService ],
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.css']
})
export class FilterComponent {
     public query= [];
     public labelList = [];
     public type: 'filter';
     public defaultType = false;
     public checkLength = 1;
     public isChecked = false;
     public searchResult$;
     public labels = [];

    constructor(
        private missionService: MissionService,
        public store: Store<fromRoot.State>
    ) { 
        this.searchResult$ = store.select(fromRoot.getSearchResult);
        this.searchResult$.subscribe((data) => {
          data.map(o => {
              this.labels.push(o.label);
          });
          console.log('searchresult:-', this.labels);
      /*this.label = data.result.label;*/
        });
    }

    public filterData($event, label) {
        const isChecked = $event.target.checked;
        const payload = {
            isChecked,
            label
        };
        this.store.dispatch(new FilterChangeAction(payload));
    }

    public getfilterCheckedData(label) {
        //    this.query.push(label);
        return {
                messageType: 'filter-checked',
                type: this.type,
                text: this.query
            };
    }
}
