import { Component, OnInit } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { AssetDataService } from '../../../services';
import * as fromRoot from '../../../reducers';
import { ToggleCreateNodeAction,
         CreateNewNodeAction,
         ToggleModalAction,
         ResponseStatusAction
 } from '../../../actions';
import { ExpandNode,
         ParentData,
         ChildData,
} from '../../../models';

@Component({
  selector: 'create-class',
  templateUrl: './createClass.component.html',
  styleUrls: ['../createNode.component.css']
})
export class CreateClassComponent {
  public currentNode$: Observable<ExpandNode>;
  public parentNode$:  Observable<ParentData>;
  public childClass$: Observable<ChildData[]>;
  public isModelNodeVisible$;
  public isChecked = false;
  public parentId;
  public isproduct;
  public name;
  public guid;
  public submitted = false;
  public selectedNode;
  public childClass;
  myForm: FormGroup;
  public classId;
  public ExpandedNodeLabel;
  public responseError$;
  public status;
  public model$;

  constructor(
    public store: Store<fromRoot.State>,
    private assetService: AssetDataService,
    private fb: FormBuilder,
    private router: Router
    ) {
      this.myForm = this.fb.group({
       'name': ''
       });
      this.model$ = store.select(fromRoot.getModelStatus);
      this.responseError$ = store.select(fromRoot.getResponseStatus);
      this.responseError$.subscribe((data) => {
        this.status = data;
      });
      this.currentNode$ = this.store.select(fromRoot.getExpandResult);
      this.parentNode$ = this.store.select(fromRoot.getParentData);
      this.childClass$ = this.store.select(fromRoot.getChildClasses);

      this.parentNode$.subscribe((data) => {
      console.log('parentData:-', data);
      this.classId = data.class[0].guid;

    });
      this.currentNode$.subscribe((data) => {
        this.ExpandedNodeLabel = data.label;
      });

    this.childClass$.subscribe((data) => {
      _.forEach(data, (o) => {
          o.id = o.guid;
      });
      // insert child classees in data
      // this.treeData.children = data;
      // this.childClass = [ this.treeData ];
      this.childClass = data;
    });
  }

  resetForm() {
     this.store.dispatch(new ToggleCreateNodeAction(false));
     this.myForm.reset();
  }

  createClassNode(post) {
          post.$parentId = this.classId;
          post.type = 'Class';
          post.parentlabel = 'cl';
          this.store.dispatch(new CreateNewNodeAction(this.myForm.value));
          this.myForm.reset();
  }

  createModelClassNode(post) {
          post.$parentId = this.classId;
          post.type = 'ProductClass';
          post.parentlabel = 'cl';
          this.store.dispatch(new CreateNewNodeAction(this.myForm.value));
          this.myForm.reset();
  }

  ModalClass(e) {
    this.isChecked = e;
    this.myForm.value.$model = e;
  }

  
  modalclose() {
    this.store.dispatch(new ToggleModalAction(false));
    this.store.dispatch(new ResponseStatusAction(''));
  }
}
