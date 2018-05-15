import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { FormBuilder,
		     FormGroup,
		     Validators
} from '@angular/forms';

import { AppKeys } from '../../../constant';
import * as fromRoot from '../../../reducers';
import { AccountTokenAction,
         ToggleModalAction,
         ResponseStatusAction
} from '../../../actions';
import { AccountToken,
         TreeviewItem
} from '../../../models';
import { UserOrgTreeService,
         TreeviewConfig
} from '../../../services';

@Component({
  selector: 'create-account',
  templateUrl: './accountNew.component.html',
  styleUrls: ['../account.component.css']
})
export class AccountNewComponent implements OnInit {
  public ContractTypeData$;
  public token$;
  public textToCopy;
  public istoken;
  public items;
  public responseError$;
  public status;
  public model$;
  public accounttoken;
  public selectedContractType = [];
  myForm: FormGroup;
  public generateAccountToken: AccountToken =
                      {
                        principalBId: '',
                        principalId: '',
                        contractTypeIds: [],
                        isPrincipalIdExist: false,
                        accountName: '',
                        token: ''
                      };
  public values: number[];
  public config = TreeviewConfig.create({
      hasAllCheckBox: false,
      hasFilter: true,
      hasCollapseExpand: true,
      decoupleChildFromParent: false,
      maxHeight: 400
  });
  public contractData = {
                        text: '',
                        label: '',
                        children: [],
                        value: ''
  };

	constructor(
    public store: Store<fromRoot.State>,
    private fb: FormBuilder,
    private router: Router,
    public toastr: ToastsManager,
    public vcr: ViewContainerRef
    ) {
      this.myForm = this.fb.group({
       'principalid': ''
      });
     this.toastr.setRootViewContainerRef(vcr);
     this.model$ = store.select(fromRoot.getModelStatus);
     this.responseError$ = store.select(fromRoot.getResponseStatus);
     this.responseError$.subscribe((data) => {
        this.status = data;
      });
     this.ContractTypeData$ = store.select(fromRoot.getContractTypeData);
     this.ContractTypeData$.subscribe((data) => {
         const res = data.map(o => {
            return {
                label: new String(o.label),
                text: new String(o.name),
                value: o.guid,
            };
         });
       this.contractData.children = res;
       this.contractData.text = 'contract_type';
       console.log('data:-',  this.contractData);
     });
     this.token$ = store.select(fromRoot.getAccountToken);
     this.token$.subscribe((data) => {
     this.accounttoken = data.result;
     console.log('token status', this.istoken);
     console.log('token value:-', this.accounttoken);
      });
  }

  ngOnInit() {
      const treedata = new TreeviewItem(this.contractData);
      this.items = [treedata];
      console.log('items:-', this.items);
  }

  generateNewAccountToken(post) {
    this.generateAccountToken.principalBId = this.myForm.value.principalid;
    this.generateAccountToken.contractTypeIds = this.selectedContractType;
    this.store.dispatch(new AccountTokenAction(this.generateAccountToken));
    //  this.router.navigate(['/token']);
  }

  resetForm() {
    this.myForm.reset();
    this.router.navigate(['/']);
  }

  selectContractTypeNode(e) {
    console.log('node in add:-', e);
    this.selectedContractType = e;
  }

  modalclose() {
    this.store.dispatch(new ToggleModalAction(false));
    this.store.dispatch(new ResponseStatusAction(''));
  }

  copyToClipboard() {
     // this.textToCopy = this.accounttoken;
     this.toastr.info('Copied');
  }
}
