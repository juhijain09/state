import { ActionReducer, Action } from '@ngrx/store';
import {
    GenerateQrCodeAction,
    GENERATE_QR_CODE

} from '../actions';

export function reducer(state= {}, action: GenerateQrCodeAction) {
    switch (action.type) {
        case GENERATE_QR_CODE:
            return action.payload;
        default:
            return state;
    }
}
