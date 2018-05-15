import { ActionReducer, Action } from '@ngrx/store';
import {
    PRODUCT_REGISTER_RESULT,
    UpdateProductRegistrationAction
} from '../actions';

export function reducer(state= {}, action: UpdateProductRegistrationAction) {
    switch (action.type) {
        case PRODUCT_REGISTER_RESULT:
            return action.payload;
        default:
            return state;
    }
}
