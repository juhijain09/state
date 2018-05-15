import { ActionReducer, Action } from '@ngrx/store';
import { AggregateBoxToggleAction , TOGGLE_CHECKBOX} from '../actions';

export function reducer(state= false, action: AggregateBoxToggleAction) {
    switch (action.type) {
        case TOGGLE_CHECKBOX:
        	return action.payload;
        default:
            return state;
    }
}
