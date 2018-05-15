import { Action } from '@ngrx/store';
import { User, Authenticate } from '../models';

export const LOGIN = '[Auth] Login';
export const LOGOUT = '[Auth] Logout';
export const LOGIN_SUCCESS = '[Auth] Login Success';
export const LOGIN_FAILURE = '[Auth] Login Failure';
export const LOGIN_REDIRECT = '[Auth] Login Redirect';

export class LoginAction implements Action {
  readonly type = LOGIN;

  constructor(public payload: {}) {}
}

export class LogoutAction implements Action {
  readonly type = LOGOUT;
}

export class LoginFailureAction implements Action {
  readonly type = LOGIN_FAILURE;

  constructor(public payload: any) {}
}

export class LoginRedirectAction implements Action {
  readonly type = LOGIN_REDIRECT;

  constructor(public payload: any) {}
}

export class LoginSuccessAction implements Action {
  readonly type = LOGIN_SUCCESS;

  constructor(public payload: { user: User }) {}
}
