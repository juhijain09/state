import { User } from '../models';
import {
	LOGIN_REDIRECT,
	LoginRedirectAction
} from '../actions';

export function reducer(state= '', action: LoginRedirectAction) {
    switch (action.type) {
        case LOGIN_REDIRECT:
        		console.log('login redirection:-', action.payload);
            return action.payload;
        default:
            return state;
    }
}
