import { Action } from '@ngrx/store';

export const TOGGLE_GENERATE_CODE = '[GENERATE CODE] Toggle';
export const GENERATE_QR_CODE = '[GENERATE CODE] Code';
export const GENERATE_CODE_RESULT = '[RESULT] Code';
export const GENERATE_ACCOUNT_TOKEN =  '[GENERATE TOKEN] Data';
export const UPDATE_ACCOUNT_TOKEN =  '[RESULT] Token';


export class ToggleGenerateCodeAction implements Action {
    type = TOGGLE_GENERATE_CODE;

    constructor(public payload: boolean) {}
}

export class GenerateQrCodeAction implements Action {
    type = GENERATE_QR_CODE;

    constructor(public payload: {}) {}
}

export class UpdateQRCodeAction implements Action {
	type = GENERATE_CODE_RESULT;

    constructor(public payload: string) {}
}

export class AccountTokenAction implements Action {
    type = GENERATE_ACCOUNT_TOKEN;

    constructor(public payload: {}) {}
}

export class UpdateTokenAction implements Action {
    type = UPDATE_ACCOUNT_TOKEN;

    constructor(public payload: {}) {}
}
