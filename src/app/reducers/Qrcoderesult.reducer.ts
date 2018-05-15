import { ActionReducer, Action } from '@ngrx/store';
import {
    GENERATE_CODE_RESULT,
    UpdateQRCodeAction,
    GenerateQrCodeAction,
    GENERATE_QR_CODE

} from '../actions';

export function reducer(state= '', action: UpdateQRCodeAction) {
    switch (action.type) {
        case GENERATE_CODE_RESULT:
         console.log('RESult url:-', action.payload );
            return action.payload;
        default:
            return state;
    }
}
