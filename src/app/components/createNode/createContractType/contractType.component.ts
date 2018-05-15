import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { Router } from '@angular/router';
import { AppKeys,
         createNode
} from '../../../constant';
import { AssetDataService } from '../../../services';
import * as fromRoot from '../../../reducers';
import { TreeModule } from 'angular-tree-component';
import {
  ExpandNode,
  ParentData,
  ChildData,
  NewContractType,
  TreeviewItem
} from '../../../models';
import {
  CreateNewNodeAction,
  ToggleCreateNodeAction,
  ResponseStatusAction,
  ToggleModalAction
} from '../../../actions';
import { UserOrgTreeService, TreeviewConfig } from '../../../services';
@Component({
  selector: 'create-contracttype',
  templateUrl: './contractType.component.html',
  styleUrls: ['../createNode.component.css']
})
export class ContractTypeComponent implements OnInit {
  public currentNode$: Observable<ExpandNode>;
  public parentNode$:  Observable<ParentData>;
  public childClass$: Observable<ChildData[]>;
  public parentId;
  public items;
  public selectedClass = '';
  public id;
  public ExpandedNodeLabel;
  public selectedApp;
  public model$;
  public responseError$;
  public status;
  myForm: FormGroup;
  public createNewNode: NewContractType =
                      {
                        ctDerivedClassId: '',
                        name: '',
                        type: '',
                        associatedAppId: '',
                        parentContractTypeGuid: '',
                        maxDataItem: '',
                        maxConcurrentAPISessions: '',
                        maxConcurrentAssetSessions: '',
                        apiKey: '',
                        authToken: ''
                      };
  public values: number[];
  public config = TreeviewConfig.create({
      hasAllCheckBox: true,
      hasFilter: true,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });
  public childClass = {
                     text: '',
                     label: '',
                     children: [],
                     value: ''
                     };

  constructor(
    public store: Store<fromRoot.State>,
    private assetService: AssetDataService,
    private fb: FormBuilder,
    private router: Router
    ) {
    this.myForm = this.fb.group({
       'Contractname': '',
       'associatedAppId': ''
     });
      this.model$ = store.select(fromRoot.getModelStatus);
      this.responseError$ = store.select(fromRoot.getResponseStatus);
      this.responseError$.subscribe((data) => {
        this.status = data;
      });
      this.currentNode$ = this.store.select(fromRoot.getExpandResult);
      this.currentNode$.subscribe((data) => {
        this.ExpandedNodeLabel = data.label;
        console.log('label', this.ExpandedNodeLabel);
      });
      this.parentNode$ = this.store.select(fromRoot.getParentData);
      this.childClass$ = this.store.select(fromRoot.getChildClasses);
      this.currentNode$.subscribe((data) => {
         this.parentId = data.guid;
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
      this.childClass.children =  res;
      this.childClass.text = 'org';
      // this.childClass = data;
      console.log('data:-', this.childClass);

    });
   }

    ngOnInit() {
      const treedata = new TreeviewItem(this.childClass);
      this.items = [treedata];
      console.log('items:-', this.items);
    }

    resetForm() {
      this.store.dispatch(new ToggleCreateNodeAction(false));
      this.myForm.reset();
    }

    onSelect(e) {
      console.log('seleted app', e);
      this.createNewNode.associatedAppId = e;
    }

    selectClassNode(e) {
      console.log('selected node', e);
      this.selectedClass = e[e.length - 1];
      // console.log('selected node', this.selectedClass);
    }

    createContractType(post) {
      const formName = this.myForm.value.Contractname;
      this.createNewNode.parentContractTypeGuid = this.parentId;
      console.log('guid', this.parentId);
      this.createNewNode.name = formName;
      this.createNewNode.ctDerivedClassId = this.selectedClass;
      this.createNewNode.type = 'ContractType';
      this.store.dispatch(new CreateNewNodeAction(this.createNewNode));
      this.myForm.reset();
    }
    
    modalclose() {
      this.store.dispatch(new ToggleModalAction(false));
      this.store.dispatch(new ResponseStatusAction(''));
    }
}
