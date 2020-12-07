import { LeagueActionTypes } from './actionTypes';
import { LeagueDispatchTypes } from './dispatchTypes';
import {
    LeagueState,
    SleeperLeagueExternal,
    SleeperLeague,
    ESPNLeague,
    ESPNLeagueExternal,
} from './storeTypes';

const INITIAL_STATE: LeagueState = {
    sleeperLeaguesExternal: [],
    espnLeagueExternal: {} as ESPNLeagueExternal,
    userLeagues: {
        sleeper: [],
        espn: [],
    },
    isLoading: false,
    error: '',
};

export const leagueReducer = (
    state: LeagueState = INITIAL_STATE,
    action: LeagueDispatchTypes
): LeagueState => {
    switch (action.type) {
        // FIND_SLEEPER_LEAGUES_FOR_USER
        case LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER:
            return {
                ...state,
                isLoading: true,
            };

        case LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_SUCCESS:
            const filteredLeagues = action.payload.map(
                (sleeperLeagueExternal: SleeperLeagueExternal) => {
                    const leagueAlreadyAdded = state.userLeagues.sleeper.find(
                        (userLeague) =>
                            userLeague.leagueId ===
                            sleeperLeagueExternal.leagueId
                    );

                    if (leagueAlreadyAdded) {
                        sleeperLeagueExternal.added = true;
                    }

                    return sleeperLeagueExternal;
                }
            );

            return {
                ...state,
                sleeperLeaguesExternal: filteredLeagues,
                isLoading: false,
                error: '',
            };

        case LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_FAIL:
            return {
                ...state,
                sleeperLeaguesExternal: [],
                isLoading: false,
                error: action.payload.error,
            };

        // FIND_ESPN_LEAGUE
        case LeagueActionTypes.FIND_ESPN_LEAGUE:
            return {
                ...state,
                isLoading: true,
            };

        case LeagueActionTypes.FIND_ESPN_LEAGUE_SUCCESS:
            const isLeagueAlreadyAdded = state.userLeagues.espn.find(
                (espnLeague: ESPNLeague) =>
                    espnLeague.leagueId === action.payload.id.toString() &&
                    espnLeague.seasonId === action.payload.seasonId.toString()
            );

            return {
                ...state,
                isLoading: false,
                error: '',
                espnLeagueExternal: {
                    ...action.payload,
                    added: isLeagueAlreadyAdded ? true : false,
                },
            };

        case LeagueActionTypes.FIND_ESPN_LEAGUE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };

        // ADD_ESPN_LEAGUE
        case LeagueActionTypes.ADD_ESPN_LEAGUE:
            return {
                ...state,
                isLoading: true,
            };

        case LeagueActionTypes.ADD_ESPN_LEAGUE_SUCCESS:
            return {
                ...state,
                espnLeagueExternal: {
                    ...state.espnLeagueExternal,
                    added: true,
                } as ESPNLeagueExternal,
                userLeagues: {
                    sleeper: [...state.userLeagues.sleeper],
                    espn: [...state.userLeagues.espn, action.payload],
                },
                isLoading: false,
                error: '',
            };

        case LeagueActionTypes.ADD_ESPN_LEAGUE_FAIL:
            return {
                ...state,
            };

        // REMOVE_ESPN_LEAGUE
        case LeagueActionTypes.REMOVE_ESPN_LEAGUE:
            return {
                ...state,
                isLoading: true,
            };

        case LeagueActionTypes.REMOVE_ESPN_LEAGUE_SUCCESS:
            const filteredESPNLeagues: ESPNLeague[] = state.userLeagues.espn.filter(
                (league: ESPNLeague) =>
                    league.seasonId !== action.payload.seasonId ||
                    (league.leagueId !== action.payload.leagueId &&
                        league.seasonId === action.payload.seasonId)
            );
            let updatedESPNLeagueExternalAfterRemoval = {} as ESPNLeagueExternal;

            if (state.espnLeagueExternal) {
                updatedESPNLeagueExternalAfterRemoval = {
                    ...state.espnLeagueExternal,
                    added: false,
                };
            }

            return {
                ...state,
                isLoading: false,
                userLeagues: {
                    ...state.userLeagues,
                    espn: filteredESPNLeagues,
                },
                espnLeagueExternal: updatedESPNLeagueExternalAfterRemoval,
                error: '',
            };

        // ADD_SLEEPER_LEAGUE
        case LeagueActionTypes.ADD_SLEEPER_LEAGUE:
            return {
                ...state,
                isLoading: true,
            };

        case LeagueActionTypes.ADD_SLEEPER_LEAGUE_SUCCESS:
            const updatedSleeperLeguesExternal = state.sleeperLeaguesExternal.map(
                (league: SleeperLeagueExternal) => {
                    if (league.leagueId === action.payload.leagueId) {
                        return {
                            ...league,
                            added: true,
                        };
                    }
                    return league;
                }
            );

            return {
                ...state,
                isLoading: false,
                sleeperLeaguesExternal: [...updatedSleeperLeguesExternal],
                userLeagues: {
                    ...state.userLeagues,
                    sleeper: [...state.userLeagues.sleeper, action.payload],
                },
                error: '',
            };

        case LeagueActionTypes.REMOVE_ESPN_LEAGUE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: 'Error removing ESPN league',
            };

        case LeagueActionTypes.ADD_SLEEPER_LEAGUE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: 'Error adding Sleeper league',
            };

        // REMOVE_SLEEPER_LEAGUE
        case LeagueActionTypes.REMOVE_SLEEPER_LEAGUE:
            return {
                ...state,
                isLoading: true,
            };

        case LeagueActionTypes.REMOVE_SLEEPER_LEAGUE_SUCCESS:
            const filteredSleeperLeagues: SleeperLeague[] = state.userLeagues.sleeper.filter(
                (league: SleeperLeague) =>
                    league.leagueId !== action.payload.leagueId
            );
            let updatedSleeperLeaguesExternalAfterRemoval: SleeperLeagueExternal[] = [];

            if (state.sleeperLeaguesExternal) {
                updatedSleeperLeaguesExternalAfterRemoval = state.sleeperLeaguesExternal.map(
                    (sleeperLeagueExternal: SleeperLeagueExternal) => {
                        if (
                            sleeperLeagueExternal.leagueId ===
                            action.payload.leagueId
                        ) {
                            return {
                                ...sleeperLeagueExternal,
                                added: false,
                            };
                        }
                        return sleeperLeagueExternal;
                    }
                );
            }

            return {
                ...state,
                isLoading: false,
                userLeagues: {
                    ...state.userLeagues,
                    sleeper: filteredSleeperLeagues,
                },
                sleeperLeaguesExternal: updatedSleeperLeaguesExternalAfterRemoval,
                error: '',
            };

        case LeagueActionTypes.REMOVE_SLEEPER_LEAGUE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: 'Error removing Sleeper league',
            };

        // STORE_PRELOADED_LEAGUES
        case LeagueActionTypes.STORE_PRELOADED_LEAGUES:
            return {
                ...state,
                userLeagues: {
                    ...state.userLeagues,
                    sleeper: action.payload.sleeperLeagues,
                    espn: action.payload.espnLeagues,
                },
            };

        // DEFAULT
        default:
            return state;
    }
};
