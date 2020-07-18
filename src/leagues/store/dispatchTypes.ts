import { LeagueActionTypes } from './actionTypes';
import { ImportedSleeperLeague } from './reducer';

// FIND_SLEEPER_LEAGUES_FOR_USER
type FindSleeperLeaguesForUser = {
    type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER;
};
type FindSleeperLeaguesForUser_success = {
    type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_SUCCESS;
    payload: {
        leagues: ImportedSleeperLeague[];
    };
};
type FindSleeperLeaguesForUser_fail = {
    type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_FAIL;
    payload: {
        error: string;
    };
};
type FindSleeperLeaguesForUserDispatchTypes =
    | FindSleeperLeaguesForUser
    | FindSleeperLeaguesForUser_success
    | FindSleeperLeaguesForUser_fail;

export type LeagueDispatchTypes = FindSleeperLeaguesForUserDispatchTypes;
