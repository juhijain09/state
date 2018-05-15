import { Component,
         ElementRef,
         OnInit
} from '@angular/core';
import { FormBuilder,
         FormGroup,
         Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';

import { AppKeys,
         createNode
} from '../../../constant';
import { AssetDataService } from '../../../services';
import * as fromRoot from '../../../reducers';
import { TreeModule } from 'angular-tree-component';
import { ExpandNode,
         ParentData,
         ChildData,
         NewAsset,
         TreeviewItem
} from '../../../models';
import { CreateNewNodeAction,
         ToggleCreateNodeAction,
         ResponseStatusAction,
         ToggleModalAction
} from '../../../actions';
import { UserOrgTreeService,
         TreeviewConfig
} from '../../../services';

@Component({
  selector: 'create-assets',
  templateUrl: './createAssets.component.html',
  styleUrls: ['../createNode.component.css']
})
export class CreateAssetComponent implements OnInit {
  public currentNode$: Observable<ExpandNode>;
  public parentNode$:  Observable<ParentData>;
  public childClass$: Observable<ChildData[]>;
  public parentId;
  public response$;
  public status;
  public model$;
  public selectedNode;
  public items;
  public selectedClass = [];
  myForm: FormGroup;
  public createNewNode: NewAsset=
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
    private el: ElementRef,
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
    this.response$ = store.select(fromRoot.getResponseStatus);
        this.response$.subscribe((data) => {
        this.status = data;
    });
    this.currentNode$ = this.store.select(fromRoot.getExpandResult);
    this.parentNode$ = this.store.select(fromRoot.getParentData);
    this.childClass$ = this.store.select(fromRoot.getChildClasses);
    this.currentNode$.subscribe((data) => {
    console.log('parentData:-', data);
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
                    text: new String(o.name),
                    label: new String(o.label),
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

  selectClassNode(e) {
    console.log('selected node:-', e);
    this.selectedClass = e;
    // console.log('selected node:-', e);

    /* const selectedNodeNames = [];
    const selectedGuidVal = [];
    const selectedNames = this.el.nativeElement.querySelectorAll('.form-check-label > [type="checkbox"]:checked');
        _.forEach(selectedNames , (o) => {
              selectedNodeNames.push(o.labels[0].innerText);
              this.selectedNode = selectedNodeNames;
        });
    const selectedGuids = this.el.nativeElement.querySelectorAll('.editbtn.guid');
     console.log('arguments:-', selectedGuids);
               _.forEach(selectedGuids , (o) => {
              selectedGuidVal.push(o.innerText);
              console.log('selectedGuids:-', selectedGuidVal);
              this.createNewNode.$classIds = selectedGuidVal;
        }); */
     // console.log('values:-', this.form.$classIds);

  }


  createAsset(post) {
    const formName = this.myForm.value.Assetname;
    this.createNewNode.$parentId = this.parentId;
    this.createNewNode.name = formName;
    this.createNewNode.type = 'asset';
    this.createNewNode.serialNumber = this.myForm.value.serialNumber;
    this.createNewNode.$classIds = this.selectedClass;
    this.createNewNode.parentLabel = 'Asset';
    this.store.dispatch(new CreateNewNodeAction(this.createNewNode));
    this.myForm.reset();
  }

  modalclose() {
    this.store.dispatch(new ToggleModalAction(false));
    this.store.dispatch(new ResponseStatusAction(''));
  }
}
