import { Action } from '@ngrx/store';

export const TOGGLE_CHECKBOX = '[Aggregate] Toggle';

export class AggregateBoxToggleAction implements Action {
    type = TOGGLE_CHECKBOX;

    constructor(public payload: boolean) {}
}

