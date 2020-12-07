import { LeagueActionTypes } from './actionTypes';
import {
    SleeperLeague,
    SleeperLeagueExternal,
    ESPNLeagueExternal,
    ESPNLeague,
} from './storeTypes';

// FIND_SLEEPER_LEAGUES_FOR_USER
type FindSleeperLeaguesForUser = {
    type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER;
};
type FindSleeperLeaguesForUser_success = {
    type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_SUCCESS;
    payload: SleeperLeagueExternal[];
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

// FIND_ESPN_LEAGUE
type FindESPNLeague = {
    type: LeagueActionTypes.FIND_ESPN_LEAGUE;
};
type FindESPNLeague_success = {
    type: LeagueActionTypes.FIND_ESPN_LEAGUE_SUCCESS;
    payload: ESPNLeagueExternal;
};
type FindESPNLeague_fail = {
    type: LeagueActionTypes.FIND_ESPN_LEAGUE_FAIL;
    payload: {
        error: string;
    };
};
type FindESPNLeagueDispatchTypes =
    | FindESPNLeague
    | FindESPNLeague_success
    | FindESPNLeague_fail;

// ADD_ESPN_LEAGUE
type AddESPNLeague = {
    type: LeagueActionTypes.ADD_ESPN_LEAGUE;
};
type AddESPNLeague_success = {
    type: LeagueActionTypes.ADD_ESPN_LEAGUE_SUCCESS;
    payload: ESPNLeague;
};
type AddESPNLeague_fail = {
    type: LeagueActionTypes.ADD_ESPN_LEAGUE_FAIL;
    payload: {
        error: string;
    };
};
type AddESPNLeagueDispatchTypes =
    | AddESPNLeague
    | AddESPNLeague_success
    | AddESPNLeague_fail;

// REMOVE_ESPN_LEAGUE
type RemoveESPNLeague = {
    type: LeagueActionTypes.REMOVE_ESPN_LEAGUE;
};
type RemoveESPNLeague_success = {
    type: LeagueActionTypes.REMOVE_ESPN_LEAGUE_SUCCESS;
    payload: {
        leagueId: string;
        seasonId: string;
    };
};
type RemoveESPNLeague_fail = {
    type: LeagueActionTypes.REMOVE_ESPN_LEAGUE_FAIL;
    payload: {
        error: string;
    };
};
type RemoveESPNLeagueDispatchTypes =
    | RemoveESPNLeague
    | RemoveESPNLeague_success
    | RemoveESPNLeague_fail;

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
    payload: {
        sleeperLeagues: SleeperLeague[];
        espnLeagues: ESPNLeague[];
    };
};
type StorePreloadedLeaguesDispatchTypes = StorePreloadedLeagues;

export type LeagueDispatchTypes =
    | FindSleeperLeaguesForUserDispatchTypes
    | AddSleeperLeagueDispatchTypes
    | RemoveSleeperLeagueDispatchTypes
    | StorePreloadedLeaguesDispatchTypes
    | FindESPNLeagueDispatchTypes
    | AddESPNLeagueDispatchTypes
    | RemoveESPNLeagueDispatchTypes;
