import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';
import { HttpClient } from '@angular/common/http';
import { of } from 'rxjs/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/take';
import * as fromRoot from '../reducers';
import { Store } from '@ngrx/store';

import {
    LoginSuccessAction,
    LoginFailureAction,
    LOGIN,
    LoginAction,
    LOGIN_SUCCESS,
    LOGIN_REDIRECT
} from '../actions';

import { AuthService } from '../services';
import { ChildData } from '../models';


@Injectable()
export class AuthEffects {
    public redirecturl;
    public returnUrl;
    // public redirect$;
    @Effect()
    update$: Observable<Action> = this.actions$
        .ofType(LOGIN)
        .map(toPayload)
        .switchMap((payload) => {
            // code for redirecting
            // let mappedActions = [new LoginSuccessAction({user: payload.user})];
            console.log('Auth service called:-', payload);
            return this.authService
                .login(payload)
                .map( data => new LoginSuccessAction(data))
                .catch(error => of(new LoginFailureAction(error)));
            }
        );

    @Effect({ dispatch: false })
    loginSuccess$ = this.actions$
        .ofType(LOGIN_SUCCESS)
        .do(() => this.router.navigateByUrl(this.returnUrl));

    constructor(
        private authService: AuthService,
        private actions$: Actions,
        private router: Router,
        public store: Store<fromRoot.State>
    ) {
        this.redirecturl = store.select(fromRoot.getRedirectionUrl);
        this.redirecturl.subscribe((data) => {
            console.log('data:---', data);
            if (data) {
                this.returnUrl = data;
            } else {
                this.returnUrl = '/';
            }
        });
    }
}
