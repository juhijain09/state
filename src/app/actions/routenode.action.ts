import { Action } from '@ngrx/store';

export const ROUTE_CHANGE = '[Route] Change';

export class RouteChangeAction implements Action {
    type = ROUTE_CHANGE;

    constructor(public payload: string) {}
}
