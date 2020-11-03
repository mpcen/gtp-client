import { combineReducers } from 'redux';

import { authReducer } from '../auth/store/reducer';
import { AuthState } from '../auth/store/storeTypes';
import { leagueReducer } from '../leagues/store/reducer';
import { LeagueState } from '../leagues/store/storeTypes';
import { appNavigationReducer } from '../appNavigation/store/reducer';
import { AppNavigationState } from '../appNavigation/store/storeTypes';

export type RootState = {
    auth: AuthState;
    leagues: LeagueState;
    appNavigation: AppNavigationState;
};

export const rootReducer = combineReducers({
    auth: authReducer,
    leagues: leagueReducer,
    appNavigation: appNavigationReducer,
});
