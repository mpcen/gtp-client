import { combineReducers } from 'redux';

import { authReducer, AuthState } from '../auth/store/reducer';
import { leagueReducer } from '../leagues/store/reducer';
import { LeagueState } from '../leagues/store/storeTypes';

export type RootState = {
    auth: AuthState;
    leagues: LeagueState;
};

export const rootReducer = combineReducers({
    auth: authReducer,
    leagues: leagueReducer,
});
