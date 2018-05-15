import { ActionReducer, Action } from '@ngrx/store';
import {
    TOGGLE_CREATE_NODE,
    ToggleCreateNodeAction
} from '../actions';

export function reducer(state = false, action: ToggleCreateNodeAction) {
    switch (action.type) {
        case TOGGLE_CREATE_NODE:
            return action.payload;
        default:
            return state;
    }
}
