import { ActionReducer, Action } from '@ngrx/store';
import {
	SEARCH_RESULT_UPDATE,
	UpdateSearchResultAction
} from '../actions';

export function reducer(state= [], action: UpdateSearchResultAction) {
    switch (action.type) {
        case SEARCH_RESULT_UPDATE:
            return action.payload;

        default:
            return state;
    }
}
