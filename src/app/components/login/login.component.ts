import { Component } from '@angular/core';
import { Router, ActivatedRoute, RouterState, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BrowserModule, DomSanitizer } from '@angular/platform-browser';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import * as fromRoot from '../../reducers';
import { LoginAction,
         LoginRedirectAction,
         GetOrgAssetsAction
} from '../../actions';
import { Authenticate } from '../../models';
import { AuthService } from '../../services';


@Component({
    selector: 'login',
    templateUrl: 'login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent {
    public loading = false;
    public loginError = false;
    public model: any = {};
    public redirect$;
    public url;
    public status$;
    public loginstatus;
    public redirectionurl;

    constructor(
        public store: Store<fromRoot.State>,
        private router: Router
    ) {}

    public login() {
        console.log('in login:-', this.model);
        const loginPaylod = {
            userid: this.model.userid,
            password: this.model.password
        };
        this.doLogin(loginPaylod);
}

    public doLogin(payload: Authenticate) {
        this.store.dispatch(new LoginAction(payload));
       // this.store.dispatch(new GetOrgAssetsAction());
    }
}
