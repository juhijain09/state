import { ActionReducer, Action } from '@ngrx/store';
import {
	UPDATE_ACCOUNT_PARENT,
	UpdateParentDataAction
} from '../actions';

export function reducer(state= [], action: UpdateParentDataAction) {
    switch (action.type) {
        case UPDATE_ACCOUNT_PARENT:
            return action.payload;
        default:
            return state;
    }
}
