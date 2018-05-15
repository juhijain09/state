import { ActionReducer, Action } from '@ngrx/store';
import {
    TOGGLE_GENERATE_CODE,
    ToggleGenerateCodeAction
} from '../actions';

export function reducer(state = false, action: ToggleGenerateCodeAction) {
    switch (action.type) {
        case TOGGLE_GENERATE_CODE:
            return action.payload;
        default :
            return state;
    }
}
