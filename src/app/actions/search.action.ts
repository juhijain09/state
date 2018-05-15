import { Action } from '@ngrx/store';
import { SearchNode } from '../models';

export const SEARCH_CHANGE = '[Search] Change';
export const SEARCH_RESULT_UPDATE = '[Search] Update';
export const ERROR_STATUS = '[Search] Error';

export class SearchChangeAction implements Action {
    type = SEARCH_CHANGE;

    constructor(public payload: string) {}
}

export class UpdateSearchResultAction implements Action {
    type = SEARCH_RESULT_UPDATE;

    constructor(public payload: SearchNode[]) {}
}
export class ErrorStatusAction implements Action {
    type = ERROR_STATUS;

    constructor(public payload: any) {}
}
