import { Component} from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import * as fromRoot from '../../../reducers';
import { ToggleCreateNodeAction } from '../../../actions';

@Component({
  selector: 'create-asset',
  templateUrl: './create.component.html',
  styleUrls: ['../createNode.component.css']
})
export class CreateComponent {
  public isCreate: boolean;
  public currentNode$;
  public label;
  public value;
  public isCreateLicense: boolean;
  public isClicked: boolean;
  constructor(
    private router: Router,
    public store: Store<fromRoot.State>
    ) {
    this.currentNode$ = this.store.select(fromRoot.getExpandResult);
    this.currentNode$.subscribe((data) => {
      this.label = data.label;
    });
  }

  createLicenseAsset() {
    if (this.label === 'org' || this.label === 'asset') {
      this.isClicked = false;
      this.isCreateLicense = true;
      this.isCreate = false;
      // this.router.navigate(['/createassetlicense']);
    } else {
      this.value = this.label;
      this.isClicked = true;
    }
  }

  createAsset() {
    if (this.label === 'org' || this.label === 'asset') {
      this.isClicked = false;
      this.isCreate = true;
      this.isCreateLicense = false;
    } else {
      this.value = this.label;
      this.isClicked = true;
    }
  }
}
