import { Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
import * as _ from 'lodash';

import { AppKeys,
         createNode
} from '../../constant';
import { AssetDataService } from '../../services';
import * as fromRoot from '../../reducers';
import { TreeModule } from 'angular-tree-component';
import { ExpandNode,
         ParentData,
         ChildData,
         NewContractType,
         TreeviewItem
} from '../../models';
import { CreateLicenseTermAction,
         ToggleCreateLicenseTermAction,
         ToggleModalAction,
         ResponseStatusAction
} from '../../actions';
import { UserOrgTreeService, TreeviewConfig } from '../../services';

@Component({
  selector: 'create-licenseterm',
  templateUrl: './licenseTerm.component.html',
  styleUrls: ['./licenseTerm.component.css']
})
export class LicenseTermComponent implements OnInit {
  public currentNode$: Observable<ExpandNode>;
  public parentNode$:  Observable<ParentData>;
  public childClass$: Observable<ChildData[]>;
  public parentId;
  public items;
  public responseError$;
  public status;
  public model$;
  public selectedClass = '';
  public id;
  myForm: FormGroup;
  public createLicenseTerm: NewContractType =
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
       'DataItem': '',
       'ConcurrentSession': '',
       'ConcurrentAssetSession': ''
     });
    this.model$ = store.select(fromRoot.getModelStatus);
    this.currentNode$ = this.store.select(fromRoot.getExpandResult);
    this.currentNode$.subscribe((data) => {
      this.parentId = data.guid;
    })
    this.parentNode$ = this.store.select(fromRoot.getParentData);
    this.responseError$ =  this.store.select(fromRoot.getResponseStatus);
    this.responseError$.subscribe(data => {
      this.status = data;
    });
    this.childClass$ = this.store.select(fromRoot.getChildClasses);
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
     this.store.dispatch(new ToggleCreateLicenseTermAction(false));
     this.myForm.reset();
     this.router.navigate(['/']);
  }

  selectClassNode(e) {
      console.log('selected node', e);
      this.selectedClass = e[e.length - 1];
  }

  creationLicenseTerm(post) {
    const formName = this.myForm.value.Contractname;
    this.createLicenseTerm.parentContractTypeGuid = this.parentId;
    console.log('guid', this.parentId);
    this.createLicenseTerm.name = formName;
    this.createLicenseTerm.type = 'ContractType';
    this.createLicenseTerm.associatedAppId = AppKeys.license;
    this.createLicenseTerm.maxDataItem = this.myForm.value.DataItem;
    this.createLicenseTerm.maxConcurrentAPISessions = this.myForm.value.ConcurrentSession;
    this.createLicenseTerm.maxConcurrentAssetSessions = this.myForm.value.ConcurrentAssetSession;
    this.createLicenseTerm.ctDerivedClassId = this.selectedClass;
    this.store.dispatch(new CreateLicenseTermAction(this.createLicenseTerm));
    this.myForm.reset();
    // this.router.navigate(['/']);
  }

  closeModal() {
    this.router.navigate(['/']);
  }

  modalclose() {
    this.store.dispatch(new ToggleModalAction(false));
    this.store.dispatch(new ResponseStatusAction(''));
  }
}
