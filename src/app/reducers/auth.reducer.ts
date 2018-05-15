import { User } from '../models';
import {
	LOGIN_SUCCESS,
	LoginSuccessAction
} from '../actions';

export interface State {
  loggedIn: boolean;
  user: User | null;
}

export const initialState: State = {
  loggedIn: false,
  user: null,
};

export function reducer(state= initialState, action: LoginSuccessAction) {
	console.log('login LoginSuccessAction:-', action.type);
    switch (action.type) {
        case LOGIN_SUCCESS:
        		console.log('login Success:-', action.payload);
            return action.payload;
        default:
            return state;
    }
}

// export const getLoggedIn = (state: State) => state.loggedIn;
// export const getUser = (state: State) => state.user;
