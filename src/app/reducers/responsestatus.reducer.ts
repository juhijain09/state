import { ActionReducer, Action } from '@ngrx/store';
import {
    RESPONSE_STATUS,
    ResponseStatusAction
} from '../actions';

export function reducer(state= '', action: ResponseStatusAction) {
    switch (action.type) {
        case RESPONSE_STATUS:
        console.log('message:-', action.payload);
            return action.payload;
        default:
            return state;
    }
}
