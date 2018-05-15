import { ActionReducer, Action } from '@ngrx/store';
import {
    TOGGLE_CREATE_LICENSE,
    ToggleCreateLicenseTermAction
} from '../actions';

export function reducer(state = false, action: ToggleCreateLicenseTermAction) {
    switch (action.type) {
        case TOGGLE_CREATE_LICENSE:
            return action.payload;
        default:
            return state;
    }
}
