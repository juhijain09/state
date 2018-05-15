import { Injectable } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import { Store } from '@ngrx/store';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { UserService } from './services';
import * as fromRoot from './reducers';
import { LoginRedirectAction } from './actions';

import { AppKeys } from './constant';

@Injectable()
export class AuthGuard implements CanActivate {
  public redirecturl;
	constructor(
		private store: Store<fromRoot.State>,
		private user: UserService,
		private router: Router,
    private activatedRoute: ActivatedRoute
		) {}

	// canActivate(
	// next: ActivatedRouteSnapshot,
	// state: RouterStateSnapshot): boolean {
	// 	this.router.navigate(['/login'])
	// 	return this.user.getUserLoggedIn();
	// }

	/*canActivate(): Observable<boolean> {
    return this.store
      .select(fromRoot.getStatus)
      .map(authed => {
      	console.log('authed:-', authed);
        if (!authed.loggedIn) {
          // this.store.dispatch(new .LoginRedirect());
			this.router.navigate(['/login']);
			return this.user.getUserLoggedIn();
        }

        return true;
      })
      .take(1);
  }
}
*/
canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
   const urlSegment: any[] = route.url;
   urlSegment.map((data) => {
     this.redirecturl = data.path;
   });
    console.log('data :-', this.redirecturl);
    return this.store
      .select(fromRoot.getStatus)
      .map(authed => {
      	console.log('authed:-', authed);
        if (!authed.loggedIn) {
    			this.router.navigate(['/login']);
          if (this.redirecturl !== '') {
             this.store.dispatch(new LoginRedirectAction(this.redirecturl));
           }
    			   return this.user.getUserLoggedIn();
        }
        return true;
      })
      .take(1);
  }
}
