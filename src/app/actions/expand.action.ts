import { Action } from '@ngrx/store';

export const EXPAND_RESULT = '[Expand] NodeResult';
export const RESET_CURRENT_NODE = '[Expand] Reset';

export class ExpandResultAction implements Action {
    type = EXPAND_RESULT;

    constructor(public payload: {}) {}
}

export class ExpandResetAction implements Action {
    type = RESET_CURRENT_NODE;
}
