import { ActionReducer, Action } from '@ngrx/store';
import { ROUTE_CHANGE, RouteChangeAction } from '../actions';

export function reducer(state: string = '', action: RouteChangeAction) {
    switch (action.type) {
        case ROUTE_CHANGE:
            return action.payload;
        default:
            return state;
    }
}
