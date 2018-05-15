import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import * as fromRoot from '../../reducers';
import { createNode, ChildNodes } from '../../constant';

@Component({
  selector: 'node-creation',
  templateUrl: './nodeCreationRules.component.html',
  styleUrls: ['./nodeCreationRules.component.css']
})

export class NodeCreationRulesComponent {
  public LabelArray =[];
  public currentNode$: Observable<ExpandNode>;
  constructor(
    public store: Store<fromRoot.State>
  ) {
    this.currentNode$ = this.store.select(fromRoot.getExpandResult);
    this.currentNode$.subscribe((data) => {
      this.currentNodeLabel = data.label;
    });
     this.LabelArray = ChildNodes[this.currentNodeLabel];
   // SHOW DATA IN ROUNBTN FORM 
}
}
