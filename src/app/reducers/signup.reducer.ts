import { ActionReducer, Action } from '@ngrx/store';
import { SIGNUP_RESULT,
    SignupResultAction
} from '../actions';

export function reducer(state= {}, action: SignupResultAction) {
    switch (action.type) {
        case SIGNUP_RESULT:
            return action.payload;
        default:
            return state;
    }
}
