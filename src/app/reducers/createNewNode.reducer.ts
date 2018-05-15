import { ActionReducer, Action } from '@ngrx/store';
import {
    CREATE_NODE_RESULT,
    CreateNodeResultAction
} from '../actions';

export function reducer(state= {}, action: CreateNodeResultAction) {
    switch (action.type) {
        case CREATE_NODE_RESULT:
        console.log('message:-', action.payload );
            return action.payload;
        default:
            return state;
    }
}
