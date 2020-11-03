import { Dispatch } from 'redux';
import { AppNavigationActionTypes } from './actionTypes';
import { AppNavigationDispatchTypes } from './dispatchTypes';
import { SelectedLeagueTab } from './storeTypes';

export const setSelectedLeagueTab = (selectedLeagueTab: SelectedLeagueTab) => {
    return (dispatch: Dispatch<AppNavigationDispatchTypes>) => {
        if (selectedLeagueTab === SelectedLeagueTab.Sleeper) {
            dispatch({
                type: AppNavigationActionTypes.SELECT_LEAGUE_TAB_SLEEPER,
            });
        } else {
            dispatch({ type: AppNavigationActionTypes.SELECT_LEAGUE_TAB_ESPN });
        }
    };
};
