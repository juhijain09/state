import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component , OnInit, ElementRef } from '@angular/core';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ExpandNode, AdminUnitNode, ChildData, TreeviewItem } from '../../../models';
import { CreateNewNodeAction,
         ToggleCreateNodeAction,
         ResponseStatusAction,
         ToggleModalAction
} from '../../../actions';
import * as _ from 'lodash';
import { UserOrgTreeService, TreeviewConfig } from '../../../services';

@Component({
  selector: 'create-adminunit',
  templateUrl: './createAdminUnit.html',
  styleUrls: ['../createNode.component.css'],
  providers: [
      UserOrgTreeService
  ]
})

export class CreateAdminUnitComponent implements OnInit {
  public isCreateNodeVisible$;
  public currentNode$: Observable<ExpandNode>;
  public childClass$: Observable<ChildData[]>;
  public treeData;
  public childClass;
  public ExpandedNodeLabel;
  public selectedNode = [];
  principalForm: FormGroup;
  post: any;                     // A property for our submitted form
  principalId = '';
  name = '';
  public model$;
  public parentAdminUnit;
  public responseStatus$;
  public status;
  public parentOrg;
  public form: AdminUnitNode = {
                        parentOrg: '',
                        type: '',
                        parentAdminUnit: '',
                        principalId: '',
                        name: ''
                      };
  public config = TreeviewConfig.create({
      hasAllCheckBox: true,
      hasFilter: true,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });
  public items;
  public values: number[];

  constructor(
    private fb: FormBuilder,
    private el: ElementRef,
    public store: Store<fromRoot.State>,
    private userOrgTreeService: UserOrgTreeService) {
    this.model$ = store.select(fromRoot.getModelStatus);
    this.responseStatus$ = this.store.select(fromRoot.getResponseStatus);
    this.responseStatus$.subscribe((data) => {
      this.status = data;
    });
    this.currentNode$ = this.store.select(fromRoot.getExpandResult);
    this.currentNode$.subscribe((data) => {
        this.parentAdminUnit = data.guid;
        this.treeData = data;
        this.treeData.id = data.guid;
    });

    this.principalForm = fb.group({
        'name' : '',
        'principalId' : [null, Validators.required],
        });
    }

    ngOnInit() {
      this.userOrgTreeService.getUserOrg()
      .subscribe((data: any) => {
      const treedata = new TreeviewItem(data);
      this.items = [treedata];
      console.log('items:-', this.items);
      });
    }

    CreateAdminUnit(post) {
      this.form.type = 'AdminUnit';
      this.form.parentAdminUnit = this.parentAdminUnit;
      this.form.name =  post.name;
      this.form.principalId = post.principalId;
      this.store.dispatch(new CreateNewNodeAction(this.form));
      this.principalForm.reset();
    }

    resetForm() {
      this.store.dispatch(new ToggleCreateNodeAction(false));
      this.principalForm.reset();
    }

    AddOrgNodeId(value) {
      const selectedNodeNames = [];
      const selectedGuidVal = [];
      const selectedNames = this.el.nativeElement.querySelectorAll('.form-check-label > [type="checkbox"]:checked');
    _.forEach(selectedNames, (o) => {
          selectedNodeNames.push(o.labels[0].innerText);
          this.selectedNode = selectedNodeNames;
    });
      // guid should be provided from tree view
      console.log('node in add:-', this.values);
      const length = value.length;
      this.form.parentOrg = value[length - 1];
      console.log('node in parentorg:-', this.form.parentOrg);
    }

    modalclose() {
      this.store.dispatch(new ToggleModalAction(false));
      this.store.dispatch(new ResponseStatusAction(''));
    }
}
