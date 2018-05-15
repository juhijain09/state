import { ActionReducer, Action } from '@ngrx/store';
import { GENERATE_ACCOUNT_TOKEN,
         AccountTokenAction,
         UPDATE_ACCOUNT_TOKEN,
         UpdateTokenAction
} from '../actions';

export function reducer(state= {}, action: UpdateTokenAction) {
    switch (action.type) {
        case UPDATE_ACCOUNT_TOKEN:
            return action.payload;
        default:
            return state;
    }
}
