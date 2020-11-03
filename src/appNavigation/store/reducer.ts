import { AppNavigationActionTypes } from './actionTypes';
import { AppNavigationDispatchTypes } from './dispatchTypes';
import { SelectedLeagueTab, AppNavigationState } from './storeTypes';

const INITIAL_STATE: AppNavigationState = {
    selectedLeagueTab: SelectedLeagueTab.Sleeper,
};

export const appNavigationReducer = (
    state: AppNavigationState = INITIAL_STATE,
    action: AppNavigationDispatchTypes
): AppNavigationState => {
    switch (action.type) {
        case AppNavigationActionTypes.SELECT_LEAGUE_TAB_SLEEPER:
            return { ...state, selectedLeagueTab: SelectedLeagueTab.Sleeper };
        case AppNavigationActionTypes.SELECT_LEAGUE_TAB_ESPN:
            return { ...state, selectedLeagueTab: SelectedLeagueTab.ESPN };

        default:
            return state;
    }
};
