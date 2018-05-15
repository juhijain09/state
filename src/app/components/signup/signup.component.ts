import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder,
         FormGroup,
         Validators
} from '@angular/forms';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../reducers';
import { SignupAction } from '../../actions';
import { Authenticate } from '../../models';

@Component({
    selector: 'signup',
    templateUrl: 'signup.component.html',
    styleUrls: ['./signup.component.css']
})

export class SignupComponent {
    myForm: FormGroup;
    constructor(
        public store: Store<fromRoot.State>,
        private router: Router,
        private fb: FormBuilder
    ) {
      this.myForm = this.fb.group({
       'principalId': '',
       'password': '',
       'accountName': '',
       'token': ''
    });
  }

  signup(post) {
     //  console.log("signned up");
    this.store.dispatch(new SignupAction(this.myForm.value));
    this.router.navigate(['/']);
  }

  resetForm() {
    this.router.navigate(['/login']);
  }
}
