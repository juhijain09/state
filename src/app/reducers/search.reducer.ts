import { ActionReducer, Action } from '@ngrx/store';
import { SEARCH_CHANGE, SearchChangeAction } from '../actions';

export function reducer(state: string = '', action: SearchChangeAction) {
    switch (action.type) {
        case SEARCH_CHANGE:
            return action.payload;
        default:
            return state;
    }
}
