import { ActionReducer, Action } from '@ngrx/store';
import {
    ERROR_STATUS,
    ErrorStatusAction
} from '../actions';

export function reducer(state= '', action: ErrorStatusAction) {
    switch (action.type) {
        case ERROR_STATUS:
        console.log('message:-', action.payload);
            return action.payload;
        default:
            return state;
    }
}
