import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as _ from 'lodash';
import { Observable } from 'rxjs/Observable';
import { FormBuilder,
    		 FormGroup,
    		 Validators
} from '@angular/forms';

import { createNode } from '../../constant';
import * as fromRoot from '../../reducers';
import { ToggleGenerateCodeAction ,
         GenerateQrCodeAction,
         UpdateQRCodeAction
} from '../../actions';
import { QrCode } from '../../models';

@Component({
  selector: 'productreg-status',
  templateUrl: './registrationStatus.component.html',
  styleUrls: ['./registrationStatus.component.css']
})
export class RegistrationStatusComponent {

 public registerStatus$;
 public status;

  public generateQRCode: QrCode =
                      {
                        principalId: '',
                        contractTypeIds: [],
                        assetGuids: []
                      };
	constructor(
    public store: Store<fromRoot.State>,
    private router: Router
    ) {
    this.registerStatus$ = store.select(fromRoot.getProductRegistration);
    this.registerStatus$.subscribe((data) => {
    this.status = data.principalId;
      console.log('id status', this.status);
    });
  }

  Close() {
    this.router.navigate(['/']);
  }
}
