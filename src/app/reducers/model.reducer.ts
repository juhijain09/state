import { ActionReducer, Action } from '@ngrx/store';
import {
    TOGGLE_MODEL,
    ToggleModalAction
} from '../actions';

export function reducer(state = false, action: ToggleModalAction) {
    switch (action.type) {
        case TOGGLE_MODEL:
            return action.payload;
        default:
            return state;
    }
}
