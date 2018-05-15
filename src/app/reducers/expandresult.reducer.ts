import { ActionReducer, Action } from '@ngrx/store';
import { ExpandResultAction , EXPAND_RESULT, RESET_CURRENT_NODE } from '../actions';

export function reducer(state= {}, action: ExpandResultAction) {
    switch (action.type) {
        case EXPAND_RESULT:
            return action.payload;
        case RESET_CURRENT_NODE:
        	return {};
        default:
            return state;
    }
}
