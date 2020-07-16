import { combineReducers } from 'redux';

import { authReducer, AuthState } from '../auth/store/reducer';

export type RootState = {
    auth: AuthState;
};

export const rootReducer = combineReducers({
    auth: authReducer,
});
