import { ActionReducer, Action } from '@ngrx/store';
import { FILTER_CHANGE, FilterChangeAction } from '../actions';

export function reducer(state= {}, action: FilterChangeAction) {
    switch (action.type) {
        case FILTER_CHANGE:
            return action.payload;
        default:
            return state;
    }
}
