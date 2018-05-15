import { Component , OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { PanelLabel, nodeType } from '../../constant';
import { Store } from '@ngrx/store';
import * as fromRoot from '../../reducers';

@Component({
  selector: 'ng-labels',
  templateUrl: './labels.component.html',
  styleUrls: ['./labels.component.css']
})

export class LabelsComponent  {
  public labelName = PanelLabel;
  public nodeName = nodeType;
  public isShow = false;
  public clickedLabel;
  public isAccount = false;

  constructor(
    private router: Router,
    public store: Store<fromRoot.State>
    ) {
    // constructior
  }

  public ShowDropDown(node) {
    if (node.name === 'Accounts') {
      // this.isAccount = true;
     this.router.navigate(['/account']);
    }
    if (node.name === 'Labels') {
      this.labelName = this.nodeName;
      this.isShow = true;
      this.clickedLabel = node.name;
      // }

    }
  }

  public HideDropDown() {
    this.labelName = PanelLabel;
    this.isShow = false;
  }
}
