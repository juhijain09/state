
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import * as fromRoot from '../../../reducers';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { ExpandNode } from '../../../models';
import { CreatePrincipalNodeAction,
         ToggleCreateNodeAction,
         ResponseStatusAction,
         ToggleModalAction
} from '../../../actions';

@Component({
  selector: 'create-principal',
  templateUrl: './createPrincipal.html',
  styleUrls: ['../createNode.component.css']
})

export class CreatePrincipalComponent {
  public isCreateNodeVisible$;
  public responseError$;
  public status;
  public model$;
  public currentNode$: Observable<ExpandNode>;
  public ExpandedNodeLabel;
  principalForm: FormGroup;
  post: any;                     // A property for our submitted form
  principalId = '';
  name = '';
  tokenId = '';

  constructor(
    private fb: FormBuilder,
    public store: Store<fromRoot.State>) {
    this.model$ = store.select(fromRoot.getModelStatus);
    this.responseError$ = store.select(fromRoot.getResponseStatus);
      this.responseError$.subscribe((data) => {
        this.status = data;
      });
    this.currentNode$ = this.store.select(fromRoot.getExpandResult);
    this.currentNode$.subscribe((data) => {
    this.ExpandedNodeLabel = data.label;
       console.log('currentPrincipal:-',  this.ExpandedNodeLabel);

    });
    this.isCreateNodeVisible$ = store.select(fromRoot.getCreateNodeStatus);

    this.principalForm = fb.group({
            'name' : [null, Validators.compose([Validators.required, Validators.maxLength(500)])],
            'principalId' : [null, Validators.required],
            'tokenId' : [null, Validators.required]
        });

  }

  CreatePrincipal(post) {
    post.type = 'Principal';
    this.store.dispatch(new CreatePrincipalNodeAction(this.principalForm.value));
    this.principalForm.reset();
  }

  resetForm() {
    this.store.dispatch(new ToggleCreateNodeAction(false));
    this.principalForm.reset();
  }
  modalclose() {
    this.store.dispatch(new ToggleModalAction(false));
    this.store.dispatch(new ResponseStatusAction(''));
  }
}
