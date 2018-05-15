import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
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
         TreeviewItem,
} from '../../../models';
import { UserOrgTreeService,
         TreeviewConfig
} from '../../../services';

@Component({
  selector: 'contract-associate',
  templateUrl: './accountExist.component.html',
  styleUrls: ['../account.component.css']
})
export class AccountExistingComponent implements OnInit {
  public ContractTypeData$;
  public token$;
  public items;
  public associate;
  public associateFail;
  public accounttoken;
  public contractAssociation$;
  public responseError$;
  public status;
  public model$;
  public errorStatus;
  public selectedContractType = [];
  public iscreate: boolean;
  myForm: FormGroup;
  public generateAccountToken: AccountToken =
                      {
                        principalBId: '',
                        principalId: '',
                        contractTypeIds: [],
                        isPrincipalIdExist: true,
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
    private router: Router
    ) {
        this.myForm = this.fb.group({
        'principalid': '',
        'accountname': ''
       });
        this.model$ = store.select(fromRoot.getModelStatus);
        this.responseError$ = store.select(fromRoot.getResponseStatus);
        this.responseError$.subscribe((data) => {
          this.errorStatus = data;
        });
        this.contractAssociation$ = store.select(fromRoot.getAccountToken);
        this.contractAssociation$.subscribe((data) => {
          this.status = data.status;
          console.log('data:-', this.status);
          if (this.status === 'success') {
              this.associate = true;
          }
        });
        /*.*/
        this.ContractTypeData$ = store.select(fromRoot.getContractTypeData);
        /*this.ContractTypeData$.subscribe((data) => {
         _.forEach(data, (o) => {
          o.id = o.guid;
       });
        this.contractData = data;
        console.log('data:-',  this.contractData);
       });*/
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
        this.accounttoken = data;
        console.log('account token', this.accounttoken);
       });
  }

  ngOnInit() {
      const treedata = new TreeviewItem(this.contractData);
      this.items = [treedata];
      console.log('items:-', this.items);
  }

  generateNewAccountToken(post) {
    this.generateAccountToken.principalBId = this.myForm.value.principalid;
    this.generateAccountToken.accountName = this.myForm.value.accountname;
    this.generateAccountToken.contractTypeIds = this.selectedContractType;
    this.store.dispatch(new AccountTokenAction(this.generateAccountToken));
  }

  resetForm() {
    this.myForm.reset();
    this.router.navigate(['/']);
  }

  selectContractTypeNode(e) {
    console.log('node in add:-', e);
    this.selectedContractType = e;
  }

  create() {
    console.log('create account');
    this.iscreate = true;
  }

  closeModal() {
    this.router.navigate(['/']);
  }

  modalclose() {
    this.store.dispatch(new ToggleModalAction(false));
    this.store.dispatch(new ResponseStatusAction(''));
  }
}
