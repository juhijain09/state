import { ActionReducer, Action } from '@ngrx/store';
import {
    APP_NAME,
    ApplicationDetailAction
} from '../actions';

export function reducer(state= '', action: ApplicationDetailAction) {
    switch (action.type) {
        case APP_NAME:
         console.log('app name:-', action.payload );
            return action.payload;
        default:
            return state;
    }
}
