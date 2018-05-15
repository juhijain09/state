import { Component} from '@angular/core';
import { Store } from '@ngrx/store';
import { Router } from '@angular/router';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { FormBuilder,
		     FormGroup,
		     Validators
} from '@angular/forms';
import { ProductRegister } from '../../models';

import * as fromRoot from '../../reducers';
import {ProductRegistrationAction} from '../../actions';

@Component({
  selector: 'warranty',
  templateUrl: './productReg.component.html',
  styleUrls: ['./productReg.component.css']
})
export class ProductRegComponent {
  public currentNode$;
  public link$;
  public assetId;
  public assetName;
  public tokenId;
  public codeData$;
  public principalId;
  public parentId;
  public account;
  public user;
  public parentNode$;
  myForm: FormGroup;
  public productRegister: ProductRegister =
                      {
                        principalId: '',
                        token: '',
                        parentLabel: '',
                        $parentId: '',
                        location: '',
                        accountName: ''
                      };

  constructor(
    public store: Store<fromRoot.State>,
    private fb: FormBuilder,
    private router: Router
    ) {
      this.myForm = this.fb.group({
       'image': File
       });
   // this.ContractTypeData$ = store.select(fromRoot.getContractTypeData);
    this.codeData$ = this.store.select(fromRoot.getQrCodeData);
    this.parentNode$ = this.store.select(fromRoot.getParentData);
    this.parentNode$.subscribe((data) => {
      this.parentId = data.org[0].guid;
    });
    this.codeData$.subscribe((data) => {
      this.principalId = data.principalId;
      console.log('principal id', this.principalId);
    });
    this.currentNode$ = this.store.select(fromRoot.getExpandResult);
    this.account = this.store.select(fromRoot.getStatus);
    this.account.subscribe((data) => {
      this.user = data.user;
    });
    this.currentNode$.subscribe((data) => {
      this.assetId = data.guid;
      this.assetName = data.name;
      // this.parentId = data.parentId;
    });
    this.link$ = store.select(fromRoot.getQrCodeResult);
    this.link$.subscribe((data) => {
      this.tokenId = data;
    });
  }

  resetForm() {
    this.myForm.reset();
  }

  registerProduct(post) {
    this.productRegister.$parentId = this.parentId;
    this.productRegister.accountName = this.user;
    this.productRegister.location = '';
    this.productRegister.parentLabel = 'org';
    this.productRegister.token = this.tokenId;
    this.productRegister.principalId = this.principalId;
    this.store.dispatch(new ProductRegistrationAction(this.productRegister));
    this.router.navigate(['/registrationstatus']);
  }
}
