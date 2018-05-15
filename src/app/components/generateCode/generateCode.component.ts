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

import { createNode,
         AppKeys
} from '../../constant';
import * as fromRoot from '../../reducers';
import { ToggleGenerateCodeAction,
         GenerateQrCodeAction,
         UpdateQRCodeAction,
         ResponseStatusAction,
         ToggleModalAction
} from '../../actions';
import { QrCode,
         TreeviewItem
} from '../../models';
import { UserOrgTreeService,
         TreeviewConfig
} from '../../services';

@Component({
  selector: 'generate-code',
  templateUrl: './generateCode.component.html',
  styleUrls: ['./generateCode.component.css'],
  providers: [ UserOrgTreeService ]
})
export class GenerateCodeComponent implements OnInit {

  public isGenerateCodeVisible$;
  public ContractTypeData$;
  public currentNode$;
  public guid;
  public link$;
  public items;
  public parentNode$;
  public parentId;
  public qrCodoeResult;
  public sno;
  public tokenId;
  public assetguid = [];
  public app;
  public brand;
  public responseError$;
  public status;
  public model$;
  public selectedContractType = [];
  myForm: FormGroup;
  public generateQRCode: QrCode =
                      {
                        principalId: '',
                        contractTypeIds: [],
                        assetGuids: []
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
                        label: '',
                        text: '',
                        children: [],
                        value: ''
  };
	constructor(
    public store: Store<fromRoot.State>,
    private fb: FormBuilder,
    private router: Router,
    private userOrgTreeService: UserOrgTreeService,
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
    this.app = AppKeys.app;
    this.brand = AppKeys.brand;
    this.isGenerateCodeVisible$ = store.select(fromRoot.getGenerateCodeStatus);
    this.parentNode$ = this.store.select(fromRoot.getParentData);
    this.link$ = store.select(fromRoot.getQrCodeResult);
    this.link$.subscribe((data) => {
      console.log('generated link after generation of qr code', data);
      this.tokenId = data;
        // this.qrCodoeResult = "http://localhost:4200/WarrantyApp?app=registerProduct&brand=WarantyApp&sno="+this.name+"&tokenId="+data;
      this.qrCodoeResult = 'http://localhost:4200/warranty/' + AppKeys.app + '/' + AppKeys.brand + '/' + this.sno + '/' + this.tokenId;
      console.log('url to be shared', this.qrCodoeResult);
    });

        this.parentNode$.subscribe((data) => {
      console.log('parentData:-', data);
      //  this.parentId = data.org[0].guid;
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
    this.currentNode$ = this.store.select(fromRoot.getExpandResult);
    this.currentNode$.subscribe((data) => {
      this.guid = data.guid;
      this.assetguid.push(this.guid);
      this.sno = data.name;
    });
  }

  ngOnInit() {
      const treedata = new TreeviewItem(this.contractData);
      this.items = [treedata];
      console.log('items:-', this.items);
  }

  generateCode(post) {
    this.generateQRCode.assetGuids = this.assetguid;
    this.generateQRCode.principalId = this.myForm.value.principalid;
    this.generateQRCode.contractTypeIds = this.selectedContractType;
    this.store.dispatch(new GenerateQrCodeAction(this.generateQRCode));
  }

  resetForm() {
    this.store.dispatch(new ToggleGenerateCodeAction(false));
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

  warranty() {
    // this.store.dispatch(new UpdateQRCodeAction(this.qrCodoeResult));
   // this.router.navigate(['/productRegistration']);
  }
}
