import { LeagueActionTypes } from './actionTypes';
import { SleeperLeague, ImportedSleeperLeague } from './storeTypes';

// FIND_SLEEPER_LEAGUES_FOR_USER
type FindSleeperLeaguesForUser = {
    type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER;
};
type FindSleeperLeaguesForUser_success = {
    type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_SUCCESS;
    payload: ImportedSleeperLeague[];
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

// ADD_SLEEPER_LEAGUE
type AddSleeperLeague = {
    type: LeagueActionTypes.ADD_SLEEPER_LEAGUE;
};
type AddSleeperLeague_success = {
    type: LeagueActionTypes.ADD_SLEEPER_LEAGUE_SUCCESS;
    payload: SleeperLeague;
};
type AddSleeperLeague_fail = {
    type: LeagueActionTypes.ADD_SLEEPER_LEAGUE_FAIL;
    payload: {
        error: string;
    };
};
type AddSleeperLeagueDispatchTypes =
    | AddSleeperLeague
    | AddSleeperLeague_success
    | AddSleeperLeague_fail;

// REMOVE_SLEEPER_LEAGUE
type RemoveSleeperLeague = {
    type: LeagueActionTypes.REMOVE_SLEEPER_LEAGUE;
};
type RemoveSleeperLeague_success = {
    type: LeagueActionTypes.REMOVE_SLEEPER_LEAGUE_SUCCESS;
    payload: {
        leagueId: string;
    };
};
type RemoveSleeperLeague_fail = {
    type: LeagueActionTypes.REMOVE_SLEEPER_LEAGUE_FAIL;
    payload: {
        error: string;
    };
};
type RemoveSleeperLeagueDispatchTypes =
    | RemoveSleeperLeague
    | RemoveSleeperLeague_success
    | RemoveSleeperLeague_fail;

// STORE_PRELOADED_LEAGUES
type StorePreloadedLeagues = {
    type: LeagueActionTypes.STORE_PRELOADED_LEAGUES;
    payload: SleeperLeague[];
};
type StorePreloadedLeaguesDispatchTypes = StorePreloadedLeagues;

export type LeagueDispatchTypes =
    | FindSleeperLeaguesForUserDispatchTypes
    | AddSleeperLeagueDispatchTypes
    | RemoveSleeperLeagueDispatchTypes
    | StorePreloadedLeaguesDispatchTypes;
