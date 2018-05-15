import { Component, OnInit, ElementRef } from '@angular/core';
import { createNode } from '../../../constant';
import { FormBuilder, FormGroup, Validators, FormsModule } from '@angular/forms';
import { AssetDataService } from '../../../services';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ExpandNode , ParentData, ChildData, NewNode, TreeviewItem } from '../../../models';
import { TreeModule } from 'angular-tree-component';
import { CreateNewNodeAction,
         ToggleCreateNodeAction,
         ResponseStatusAction,
         ToggleModalAction
} from '../../../actions';
import { UserOrgTreeService, TreeviewConfig } from '../../../services';
import * as _ from 'lodash';
import { Router } from '@angular/router';
@Component({
  selector: 'create-org',
  templateUrl: './createOrg.component.html',
  styleUrls: ['../createNode.component.css'],
  providers: [
      UserOrgTreeService
  ]
})
export class CreateOrgComponent implements OnInit {
  public currentNode$: Observable<ExpandNode>;
  public parentNode$: Observable<ParentData>;
  public childClass$: Observable<ChildData[]>;
  public treeData;
  public name;
  public selectedNode = [];
  public submitted = false;
  public FormNodeData = [];
  public parentId;
  public responseError$;
  public status;
  public model$;
  public OrgForm: FormGroup;
  public childClass = {
                     label: '',
                     text: '',
                     children: [],
                     value: ''
                     };
  public NodeList = createNode;
  public ClassId;
  public form: NewNode = {
                        $parentId: '',
                        name: '',
                        parentlabel: '',
                        $classIds: [],
                        type: '',
                        guid: '',
                      };
  public items;
  public parentName;
  public values: string[];
  public config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasFilter: true,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });
  constructor(
    private el: ElementRef,
    private router: Router,
    public store: Store<fromRoot.State>,
    private fb: FormBuilder,
    private userOrgTreeService: UserOrgTreeService
    ) {
       this.OrgForm = this.fb.group({
       'name': '',
       '$classIds': []
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
    console.log('data in org', data);
    this.treeData = data;
    this.treeData.id = data.guid;
  });

  this.parentNode$.subscribe((data) => {
    this.parentId = data.org[0].guid;
    this.parentName =  data.org[0].name;
    this.ClassId = data.class[0].guid;
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
    console.log('data:-', this.childClass);
    });
  }

  public ngOnInit() {
    const treedata = new TreeviewItem(this.childClass);
    this.items = [treedata];
    console.log('VALUES:-', this.values);
  }

  public resetForm() {
    this.store.dispatch(new ToggleCreateNodeAction(false));
    this.OrgForm.reset();
  }

  public createOrg(post) {
    this.form.$parentId = this.parentId;
    this.form.type = 'Organisation';
    this.form.parentlabel = 'org';
    this.form.guid = this.treeData.id;
    this.form.name = post.name;
    this.store.dispatch(new CreateNewNodeAction(this.form));
    this.OrgForm.reset();
  }

  public showSelectedNode(val) {
    console.log('VALUES:-', this.values);
    const selectedNodeNames = [];
    const selectedGuidVal = [];
    const selectedNames = this.el.nativeElement.querySelectorAll('.form-check-label > [type="checkbox"]:checked');
        _.forEach(selectedNames, (o) => {
              selectedNodeNames.push(o.labels[0].innerText);
              this.selectedNode = selectedNodeNames;
        });
    const selectedGuids = this.el.nativeElement.querySelectorAll('.editbtn.guid');
    console.log('arguments:-', selectedGuids);
               _.forEach(selectedGuids, (o) => {
              selectedGuidVal.push(o.innerText);
              console.log('selectedGuids:-', selectedGuidVal);
              this.form.$classIds = selectedGuidVal;
        });
  }

  modalclose() {
    this.store.dispatch(new ToggleModalAction(false));
    this.store.dispatch(new ResponseStatusAction(''));
  }
}
