import { Component, ElementRef, OnChanges} from '@angular/core';
import { createNode, ChildNodes } from '../../constant';
import * as fromRoot from '../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { RouteChangeAction } from '../../actions';
import { Router } from '@angular/router';
import { ExpandNode } from '../../models';
import { ToggleCreateNodeAction, ShowNodeDetailsAction } from '../../actions';
import * as _ from 'lodash';

@Component({
  selector: 'create-node',
  templateUrl: './createNode.component.html',
  styleUrls: ['./createNode.component.css']
})
export class CreateNodeComponent {
  public isCreateNodeVisible$;
  public currentNode$: Observable<ExpandNode>;
  public CreateNodeLabel$;
  public ExpandedNodeLabel;
  public NodeList = createNode;
  public label;
  public link;
  public currentNodeName;
  public currentNodeLabel;
  public LabelArray = [];
    constructor(
    public store: Store<fromRoot.State>,
    private router: Router,
    private el: ElementRef,
    ) {
      this.isCreateNodeVisible$ = store.select(fromRoot.getCreateNodeStatus);
      this.currentNode$ = this.store.select(fromRoot.getExpandResult);
      this.store.dispatch(new ShowNodeDetailsAction(false));
      this.currentNode$.subscribe((data) => {
      this.currentNodeName = data.name;
      this.currentNodeLabel = data.label;
    });
      if(this.currentNodeName === undefined){
           _.forEach(this.NodeList, (o) => {
             o.enable = 'disabled';
          });
      }
       // const LabelName = this.currentNodeLabel + 'Child';
             else {
               this.LabelArray = ChildNodes[this.currentNodeLabel];
                   _.forEach(this.NodeList, (o) => {
                    o.enable = 'true';
                   if(this.LabelArray.indexOf(o.name) === -1){
                    o.enable ='disabled';
                 }
               });
             }
  }

  SelectedNodeType(node) {
    const clicked = true;
    this.label = node.name;
    this.link = 'createnode/' + this.label;
    console.log('link', this.link);
    this.router.navigateByUrl(this.link);
    // this is for getting the labels for selected type
    this.store.dispatch(new RouteChangeAction(node.name));
  }

  ReturnToMain() {
    this.store.dispatch(new ToggleCreateNodeAction(false));
  }
}
