import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { DropDown, DataItemNode, TreeviewItem} from '../../../models';
import { TreeModule } from 'angular-tree-component';
import { CreateDataItemAction,
         ToggleCreateNodeAction,
         AggregateBoxToggleAction,
         ResponseStatusAction,
         ToggleModalAction
} from '../../../actions';
import { ClassDataService, TreeviewConfig } from '../../../services';
import { ParseDataForTreeView } from '../../../parser';
import * as _ from 'lodash';

@Component({
  selector: 'create-dataitem',
  templateUrl: './createDataItem.component.html',
  styleUrls: ['../createNode.component.css']
})
export class CreateDataItemComponent implements OnInit {
  public isCreateNodeVisible$;
  public viewAgg = false;
  public DIForm: FormGroup;
  public ClassId;
  public items;
  public model$;
  public values: number[];
  public childClass = [];
  public responseError$;
  public status;
  public DataType: DropDown[] = [
                      { name: 'Double', id: 'Double' },
                      { name: 'Float', id: 'Float' },
                      { name: 'Integer', id: 'Integer' }
                      ];
   public form: DataItemNode =
                      {
                        name: '',
                        parentlabel: '',
                        $classIds: [],
                        type: '',
                        diType: '',
                        alias: '',
                        checked: false,
                        unitOfMeasurement: '',
                        maximunValue: 0,
                        minimumValue: 0
                      };
    public config = TreeviewConfig.create({
      hasAllCheckBox: true,
      hasFilter: true,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });
    constructor(
    public store: Store<fromRoot.State>,
    private fb: FormBuilder,
    private classDataService: ClassDataService
    ) {
       this.DIForm = this.fb.group({
       'name': '',
       'diType': '',
       'frequencyOfMeasurement': '',
       'maximunValue': null,
       'minimumValue': null,
       'unitOfMeasurement': '',
       'min': '',
       'max': '',
       'mean': ''
       });
       this.model$ = store.select(fromRoot.getModelStatus);
       this.responseError$ = store.select(fromRoot.getResponseStatus);
       this.responseError$.subscribe((data) => {
        this.status = data;
      });
       this.isCreateNodeVisible$ = store.select(fromRoot.getCreateNodeStatus);
    }
        ngOnInit() {
        this.classDataService.getDIClasses()
        .subscribe((data: any) => {
        const tree = ParseDataForTreeView(data);
          _.forEach(tree , (o) => {
          const treedata = new TreeviewItem(o);
           this.childClass.push(treedata);
          });
        this.items = this.childClass;
        console.log('items:-', this.items);
        });
    }
        resetForm() {
          this.store.dispatch(new ToggleCreateNodeAction(false));
          this.DIForm.reset();
        }

        CreateDataItem(post) {
          this.form.type = 'DataItem';
          this.form.parentlabel = 'Di';
          this.form.alias = 'global_data_item';
          this.form.name = post.name;
          this.store.dispatch(new CreateDataItemAction(this.form));
          this.DIForm.reset();
        }

        selectClassNode(values) {
          // TODO IMPLEMENT TREE AND CHECK
          console.log('node in add:-', values);
          this.form.$classIds = values;
        }

        SelectDIType(e) {
          console.log('ditype:-', e);
          this.form.diType = e;
          this.form.unitOfMeasurement = e;
        }

        AggregateData(e) {
          this.viewAgg = !this.viewAgg;
          this.form.checked = e;
          this.store.dispatch(new AggregateBoxToggleAction(e));
        }

        createDataItem(post) {
          this.form.type = 'DataItem';
          this.form.parentlabel = 'Di';
          this.form.alias = 'global_data_item';
          this.form.name = post.name;
          this.store.dispatch(new CreateDataItemAction(this.form));
          this.DIForm.reset();
    }
        modalclose() {
          this.store.dispatch(new ToggleModalAction(false));
          this.store.dispatch(new ResponseStatusAction(''));
      }
 }
