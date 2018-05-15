import { ActionReducer, Action } from '@ngrx/store';
import {
	UPDATE_CLASS_CHILD,
	UpdateChildDataAction
} from '../actions';

export function reducer(state= [], action: UpdateChildDataAction) {
    switch (action.type) {
        case UPDATE_CLASS_CHILD:
            return action.payload;
        default:
            return state;
    }
}
