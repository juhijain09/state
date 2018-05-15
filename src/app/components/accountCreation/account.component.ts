import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';
import { GetContractTypeDataAction } from '../../actions';

@Component({
  selector: 'accounts',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent {
	public existing: boolean;
	public newAccount: boolean;

	constructor(
	private router: Router,
	public store: Store<fromRoot.State>) {}

	onExists() {
		// console.log("existing", e);
		this.store.dispatch(new GetContractTypeDataAction());
		setTimeout(() => 
		{
    	this.existing = true;
    	this.newAccount = false;
		},
		500);
	}

	onNew() {
		//  console.log("new", e);
		this.store.dispatch(new GetContractTypeDataAction());
		setTimeout(() => 
		{
    	this.newAccount = true;
		this.existing = false;
		},
		500);
	}

	ReturnToMain() {
		this.router.navigate(['/']);
	}
}
