import { Action } from '@ngrx/store';

export const SHOW_NODE_DETAILS = '[Node] show details';

export class ShowNodeDetailsAction implements Action {
    type = SHOW_NODE_DETAILS;

    constructor(public payload: boolean) {}
}
