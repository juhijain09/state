import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ExpandNode , DropDown, ChildData, TreeviewItem } from '../../../models';
import { TreeModule } from 'angular-tree-component';
import { CreateDataItemAction,
         ToggleCreateNodeAction,
         ResponseStatusAction,
         ToggleModalAction
} from '../../../actions';
import * as _ from 'lodash';
import {Router } from '@angular/router';
import { UserOrgTreeService, TreeviewConfig } from '../../../services';

@Component({
  selector: 'create-event',
  templateUrl: './createEvents.component.html',
  styleUrls: ['../createNode.component.css']
})
export class CreateEventComponent implements OnInit {
  public currentNode$: Observable<ExpandNode>;
  public childClass$: Observable<ChildData[]>;
  public isCreateNodeVisible$;
  public currentNodeId;
  public responseError$;
  public status;
  public model$;
  public EventForm: FormGroup;
  public childClass = {
                     label: '',
                     text: '',
                     children: [],
                     value: ''
                     };
  public DataType: DropDown[] = [ { name: 'Double', id: 'Double' },
                                 { name: 'Float', id: 'Float' },
                                 { name: 'Boolean', id: 'Boolean' }];
  public items;
  public values: number[];
  public config = TreeviewConfig.create({
      hasAllCheckBox: true,
      hasFilter: true,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });

	constructor(
    private router: Router,
    public store: Store<fromRoot.State>,
    private fb: FormBuilder,
    ) {
       this.EventForm = this.fb.group({
       'name': '',
       'unitOfMeasurement': '',
       '$classIds': []
       });
    this.model$ = store.select(fromRoot.getModelStatus);
    this.responseError$ = store.select(fromRoot.getResponseStatus);
      this.responseError$.subscribe((data) => {
        this.status = data;
      });
    this.currentNode$ = this.store.select(fromRoot.getExpandResult);
    this.isCreateNodeVisible$ = store.select(fromRoot.getCreateNodeStatus);
    this.childClass$ = this.store.select(fromRoot.getChildClasses);
    this.currentNode$.subscribe((data) => {
      this.currentNodeId = data.guid;
    });
    this.childClass$.subscribe((data) => {
      // insert child classees in data
       const res = data.map(o => {
                return {
                    label: new String(o.label),
                    text: new String(o.name),
                    value: o.guid,
                  };
              });
      this.childClass.children = res;
      this.childClass.text = 'org';
      // this.childClass = data;
    });
  }

      ngOnInit() {
          const treedata = new TreeviewItem(this.childClass);
          this.items = [treedata];
          console.log('items:-', this.items);
      }

      CreateEvent(post) {
          post.$parentId = this.currentNodeId;
          post.type = 'Event';
          post.parentlabel = 'Ev';
          this.store.dispatch(new CreateDataItemAction(this.EventForm.value));
          this.EventForm.reset();
      }

      showSelectedNode() {
        this.EventForm.value.$classIds = this.values;
      }

       onSelect(e) {
        this.EventForm.value.unitOfMeasurement = e;
      }

      resetForm() {
        this.store.dispatch(new ToggleCreateNodeAction(false));
        this.EventForm.reset();
      }

      modalclose() {
        this.store.dispatch(new ToggleModalAction(false));
        this.store.dispatch(new ResponseStatusAction(''));
  }
}
