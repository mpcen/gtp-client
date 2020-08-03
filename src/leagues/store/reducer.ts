import { LeagueActionTypes } from './actionTypes';
import { LeagueDispatchTypes } from './dispatchTypes';
import {
    LeagueState,
    ImportedSleeperLeague,
    SleeperLeague,
} from './storeTypes';

const INITIAL_STATE: LeagueState = {
    importSleeperLeagues: {
        leagues: [],
    },
    userLeagues: {
        sleeper: [],
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
            return {
                ...state,
                importSleeperLeagues: {
                    leagues: action.payload,
                },
                isLoading: false,
                error: '',
            };
        case LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_FAIL:
            return {
                ...state,
                importSleeperLeagues: {
                    leagues: [],
                },
                isLoading: false,
                error: action.payload.error,
            };

        // ADD_SLEEPER_LEAGUE
        case LeagueActionTypes.ADD_SLEEPER_LEAGUE:
            return {
                ...state,
                isLoading: true,
            };
        case LeagueActionTypes.ADD_SLEEPER_LEAGUE_SUCCESS:
            const updatedImportSleeperLeagues = state.importSleeperLeagues.leagues.map(
                (league: ImportedSleeperLeague) => {
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
                importSleeperLeagues: {
                    leagues: [...updatedImportSleeperLeagues],
                },
                userLeagues: {
                    sleeper: [...state.userLeagues.sleeper, action.payload],
                },
                error: '',
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
            let updatedImportSleeperLeaguesAfterRemoval: ImportedSleeperLeague[] = [];

            if (state.importSleeperLeagues.leagues) {
                updatedImportSleeperLeaguesAfterRemoval = state.importSleeperLeagues.leagues.map(
                    (league: ImportedSleeperLeague) => {
                        if (league.leagueId === action.payload.leagueId) {
                            return {
                                ...league,
                                added: false,
                            };
                        }
                        return league;
                    }
                );
            }

            return {
                ...state,
                isLoading: false,
                userLeagues: {
                    sleeper: filteredSleeperLeagues,
                },
                importSleeperLeagues: {
                    leagues: updatedImportSleeperLeaguesAfterRemoval,
                },
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
                    sleeper: action.payload,
                },
            };

        // DEFAULT
        default:
            return state;
    }
};
