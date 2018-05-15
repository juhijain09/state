import { Action } from '@ngrx/store';
export const PRODUCT_REGISTER = '[PRODUCT_REGISTER] Asset';
export const PRODUCT_REGISTER_RESULT = '[PRODUCT_REGISTER_RESULT] Result';


export class ProductRegistrationAction implements Action {
    type = PRODUCT_REGISTER;

    constructor(public payload: {}) {}
}
export class UpdateProductRegistrationAction implements Action {
	type = PRODUCT_REGISTER_RESULT;

    constructor(public payload: {}) {}
}
