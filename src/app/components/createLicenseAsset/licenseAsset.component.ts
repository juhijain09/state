import { Component, OnInit } from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { TreeModule } from 'angular-tree-component';

import { AppKeys,
         createNode
} from '../../constant';
import { AssetDataService } from '../../services';
import * as fromRoot from '../../reducers';
import { ExpandNode,
         ParentData,
         ChildData,
         NewAsset,
         TreeviewItem
 } from '../../models';
import { CreateNewNodeAction,
         ToggleCreateNodeAction,
         ToggleModalAction,
         ResponseStatusAction
} from '../../actions';
import { UserOrgTreeService,
         TreeviewConfig
} from '../../services';

@Component({
  selector: 'create-licenseasset',
  templateUrl: './licenseAsset.component.html',
  styleUrls: ['./licenseAsset.component.css']
})
export class CreateLicenseAssetComponent implements OnInit {
  public currentNode$: Observable<ExpandNode>;
  public parentNode$:  Observable<ParentData>;
  public childClass$: Observable<ChildData[]>;
  public parentId;
  public items;
  public responseError$;
  public status;
  public model$;
  public selectedClass = [];
  myForm: FormGroup;
  public createNewNode: NewAsset =
                      {
                          $parentId: '',
                          $classIds: [],
                          type: '',
                          associatedAppId: '',
                          name: '',
                          serialNumber: '',
                          parentLabel: '',
                          maxAssetCount: ''
  };
  public values: number[];
  public config = TreeviewConfig.create({
      hasAllCheckBox: true,
      hasFilter: true,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });
  /*public childClass;*/
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
     'Assetname': '',
     'serialNumber': '',
     'maxAssetCount': ''
    });
    this.model$ = store.select(fromRoot.getModelStatus);
    this.responseError$ = store.select(fromRoot.getResponseStatus);
    this.responseError$.subscribe((data) => {
        this.status = data;
    });
    this.currentNode$ = this.store.select(fromRoot.getExpandResult);
    this.parentNode$ = this.store.select(fromRoot.getParentData);
    this.childClass$ = this.store.select(fromRoot.getChildClasses);
    this.currentNode$.subscribe((data) => {
      this.parentId = data.guid;
    });
    /*this.childClass$.subscribe((data) => {
      _.forEach(data, (o) => {
        o.id = o.guid;
      });
    this.childClass = data;
    console.log('data:-',  this.childClass);
    });*/
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
     this.router.navigate(['/']);
  }

  selectClassNode(e) {
    // console.log("selected node",e.node.data.id);
    console.log('selected node', e);
    this.selectedClass = e;
  }

  createAssetLicense(post) {
    // this.Nodename = Post.Nodename;
    const formName = this.myForm.value.Assetname;
    this.createNewNode.$parentId = this.parentId;
    console.log('guid', this.parentId);
    this.createNewNode.name = formName;
    this.createNewNode.type = 'LicenseAsset';
    this.createNewNode.parentLabel = 'Asset';
    this.createNewNode.serialNumber = this.myForm.value.serialNumber;
    this.createNewNode.associatedAppId = AppKeys.license;
    this.createNewNode.maxAssetCount = this.myForm.value.maxAssetCount;
    this.createNewNode.$classIds = this.selectedClass;
    this.store.dispatch(new CreateNewNodeAction(this.createNewNode));
    this.myForm.reset();
    this.router.navigate(['/']);
  }

  modalclose() {
    this.store.dispatch(new ToggleModalAction(false));
    this.store.dispatch(new ResponseStatusAction(''));
  }
}
