import { ActionReducer, Action } from '@ngrx/store';
import { SHOW_NODE_DETAILS, ShowNodeDetailsAction } from '../actions';

export function reducer(state= false, action: ShowNodeDetailsAction) {
    switch (action.type) {
        case SHOW_NODE_DETAILS:
        	console.log('SHOW_NODE_DETAILS:-', action);
            return action.payload;
        default:
            return state;
    }
}
