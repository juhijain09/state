import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';
import { LocalStorageService, MissionService } from '../../services';
import * as fromRoot from '../../reducers';

import { ExpandNode } from '../../models';
import {
  SearchChangeAction,
  ShowNodeDetailsAction,
  ExpandResultAction,
  ExpandResetAction,
  ToggleCreateNodeAction,
  GetParentDataAction,
  ToggleGenerateCodeAction,
  GetContractTypeDataAction,
  ToggleCreateLicenseTermAction,
  ToggleModalAction,
  ErrorStatusAction,
  UpdateSearchResultAction

} from '../../actions';

  //  GetParentDataAction
@Component({
  selector: 'ng-header',
  providers: [MissionService, LocalStorageService],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  public currentNode$: Observable<ExpandNode>;
  public isCreateNodeVisible$;
  public searchterm;
  public searchResult$;
  public returnURL;
  public typeCode = ['name', 'guid', 'serialnumber'];
  public defaultType = 'name';
  public query: string;
  public type: string;
  public showDetails;
  public currentNode;
  public responseError$;
  public status;
  public model$;

  constructor(
    public store: Store<fromRoot.State>,
    private storageService: LocalStorageService,
    private missionService: MissionService,
    private router: Router
  ) {
       this.model$ = store.select(fromRoot.getModelStatus);
       this.responseError$ = store.select(fromRoot.getSearchError);
       this.responseError$.subscribe((data) => {
         this.status = data;
       });
       this.currentNode$ = this.store.select(fromRoot.getExpandResult);
       this.isCreateNodeVisible$ = store.select(fromRoot.getCreateNodeStatus);
       this.searchResult$ = store.select(fromRoot.getSearchResult);
  }
  public ngOnInit() {
    // this.storageService.set('isBackFromNg2', 'yes');
  }
  public navigateHome() {
    this.returnURL = '/app.html?app=assetOverviewApp&brand=LG';
    window.location.href = this.returnURL;

  }
  // public ShowNodeDetails(e) {
  //   e.preventDefault();
  //   this.store.dispatch(new ShowNodeDetailsAction(true));
  // }
  public onSearch(e) {
    this.store.dispatch(new ErrorStatusAction(''));
    this.store.dispatch(new UpdateSearchResultAction([]));
    this.query = e.target.value.trim();
    if (e.keyCode === 13 && this.query !== '') {
       this.store.dispatch(new ExpandResetAction());
        this.getSearchData();
    }
  }
  public getSearchData() {
    if (this.query) {
      console.log('search query:-', this.query);
      this.store.dispatch(new SearchChangeAction(this.query));
    }
  }
  public createNode() {
    this.store.dispatch(new ToggleCreateNodeAction(true));
    this.store.dispatch(new GetParentDataAction());

  }
  public generate() {
   // this.isCheck=true;
    this.store.dispatch(new ToggleGenerateCodeAction(true));
    this.store.dispatch(new GetContractTypeDataAction());
    setTimeout(() => {
      this.router.navigate(['/generate']);
    },
    900);
  }

  createAssetLicense() {
    this.router.navigate(['/createassetlicense']);
  }

  createLicenseTerm() {
    this.store.dispatch(new ToggleCreateLicenseTermAction(true));
    this.store.dispatch(new GetParentDataAction());
    setTimeout(() => {
    this.router.navigate(['/createlicense']);
    },
    900);
  }
}
