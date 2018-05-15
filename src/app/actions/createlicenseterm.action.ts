import { Action } from '@ngrx/store';

export const TOGGLE_CREATE_LICENSE = '[CreateLicense] Toggle';
export const CREATE_LICENSE = '[CreateLicense] New license';
export const CREATE_LICENSE_RESULT = '[CreateLicense] license result';
export const APP_NAME = '[CreateLicense] App Name';

export class ApplicationDetailAction implements Action {
	type = APP_NAME;

	constructor(public payload: string) {}
}

export class ToggleCreateLicenseTermAction implements Action {
    type = TOGGLE_CREATE_LICENSE;

    constructor(public payload: boolean) {}
}
export class CreateLicenseTermAction implements Action {
    type = CREATE_LICENSE;

    constructor(public payload: {}) {}
}
export class CreateLicenseResultAction implements Action {
    type = CREATE_LICENSE_RESULT;

    constructor(public payload: {}) {}
}
