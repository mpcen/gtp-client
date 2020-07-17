import { combineReducers } from 'redux';

import { authReducer, AuthState } from '../auth/store/reducer';
import { leagueReducer, LeagueState } from '../leagues/store/reducer';

export type RootState = {
    auth: AuthState;
    leagues: LeagueState;
};

export const rootReducer = combineReducers({
    auth: authReducer,
    leagues: leagueReducer,
});
