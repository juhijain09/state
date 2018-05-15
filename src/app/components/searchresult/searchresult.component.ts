import {
    Component,
    Input,
    Output,
    OnChanges,
    EventEmitter
} from '@angular/core';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as fromRoot from '../../reducers';

import {
ExpandResultAction,
SearchChangeAction,
ShowNodeDetailsAction
 } from '../../actions';
import * as _ from 'lodash';
import { nodeType } from '../../constant';

@Component({
    selector: 'search-result',
    templateUrl: './searchresult.component.html',
    styleUrls: ['./searchresult.component.css']
})
export class SearchResultComponent implements OnChanges {
    @Input() private nodeData;
    @Input() private filterData;
    @Input() private messageData;
    public filterList = [];
    public currentNode;
    public nodeName = [];
    public expandHistory = [];
    public childData;
    public searchResult$;
    public responseError$;
    public status;
    constructor( public store: Store<fromRoot.State> ) {
        this.searchResult$ = store.select(fromRoot.getSearchResult);
        this.searchResult$.subscribe((data) => {
           if(data){
           this.store.dispatch(new ShowNodeDetailsAction(true));
           }
          });
        this.responseError$ = store.select(fromRoot.getSearchError);
        this.responseError$.subscribe((data) => {
             this.status = data;
       });
        this.searchResult$.subscribe((data) => {
            // if(data) // check if the details should be displayed on expand
         this.store.dispatch(new ShowNodeDetailsAction(true));
    });
        /*this.response$ = store.select(fromRoot.getResponseStatus);
        this.response$.subscribe(data => {
            this.message = data.error;
            console.log("error", this.message);
        })*/
    }

    public ngOnChanges() {
        const {isChecked, label}  = this.filterData;
        const labelIndex = this.filterList.indexOf(label);

        if (isChecked && labelIndex === -1) {
            this.filterList.push(label);
        } else if (!isChecked &&  labelIndex > -1) {
            this.filterList.splice(labelIndex, 1);
        }
        if (this.filterList.length > 0 ) {
            _.forEach(this.nodeData, (o) => {
                if (this.filterList.indexOf(o.label) > -1) {
                    o.view = true;
                } else {
                    o.view = false;
                }
            });
        } else {
            _.forEach(this.nodeData, (o) => {
                    o.view = true;
            });
        }
    }

    public expandNode(node: any) {
      this.store.dispatch(new ExpandResultAction(node));
      // this.store.dispatch(new ShowNodeDetailsAction(true));
    }
}
