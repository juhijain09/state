import { ActionReducer, Action } from '@ngrx/store';
import {
    CREATE_LICENSE_RESULT,
    CreateLicenseResultAction
} from '../actions';

export function reducer(state= {}, action: CreateLicenseResultAction) {
    switch (action.type) {
        case CREATE_LICENSE_RESULT:
            return action.payload;
        default:
            return state;
    }
}
