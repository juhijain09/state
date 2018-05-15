import { Action } from '@ngrx/store';

export const SIGN_UP = '[SIGNUP] Signup Data';
export const SIGNUP_RESULT = '[SIGNUP] Signup Result';

export class SignupAction implements Action {
    type = SIGN_UP;

    constructor(public payload: {}) {}
}

export class SignupResultAction implements Action {
    type = SIGNUP_RESULT;

    constructor(public payload: {}) {}
}
