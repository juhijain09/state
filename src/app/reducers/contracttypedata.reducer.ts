import { ActionReducer, Action } from '@ngrx/store';
import {
	UPDATE_DATA_CONTRACTTYPE,
	UpdateContractTypeDataAction
} from '../actions';

export function reducer(state= [], action: UpdateContractTypeDataAction) {
    switch (action.type) {
        case UPDATE_DATA_CONTRACTTYPE:
            return action.payload;
        default:
            return state;
    }
}
