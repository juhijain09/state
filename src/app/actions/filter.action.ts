import { Action } from '@ngrx/store';
import { Filter } from '../models';

export const FILTER_CHANGE = '[Filter] Change';
export class FilterChangeAction implements Action {
    type = FILTER_CHANGE;

    constructor(public payload: Filter) {}
}
