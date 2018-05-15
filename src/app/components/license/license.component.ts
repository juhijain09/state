import { Component, Input , OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';

import { ApplicationDetailAction } from '../../actions';
import * as fromRoot from '../../reducers';
import { AppKeys } from '../../constant';

@Component({
  selector: 'license',
  templateUrl: './license.component.html'
})
export class LicenseComponent implements OnInit {

  constructor(private router: Router,
  	          public store: Store<fromRoot.State>) {}

  ngOnInit() {
  this.store.dispatch(new ApplicationDetailAction(AppKeys.license));
	}
}
