import { AppNavigationActionTypes } from './actionTypes';

type SelectLeagueSleeper = {
    type: AppNavigationActionTypes.SELECT_LEAGUE_TAB_SLEEPER;
};
type SelectLeagueESPN = {
    type: AppNavigationActionTypes.SELECT_LEAGUE_TAB_ESPN;
};
type SelectLeagueTabDispatchTypes = SelectLeagueSleeper | SelectLeagueESPN;

export type AppNavigationDispatchTypes = SelectLeagueTabDispatchTypes;
