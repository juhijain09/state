import { ActionReducer, Action } from '@ngrx/store';
import {
    GENERATE_ACCOUNT_TOKEN,
    AccountTokenAction
} from '../actions';

export function reducer(state= {}, action: AccountTokenAction) {
    switch (action.type) {
        case GENERATE_ACCOUNT_TOKEN:
         console.log('account token value:-', action.payload );
            return action.payload;
        default:
            return state;
    }
}
