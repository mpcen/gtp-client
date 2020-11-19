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
    espnLeagueExternal: null,
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
                (importedSleeperLeague) => {
                    const leagueAlreadyAdded = state.userLeagues.sleeper.find(
                        (userLeague) =>
                            userLeague.leagueId ===
                            importedSleeperLeague.leagueId
                    );

                    if (leagueAlreadyAdded) {
                        importedSleeperLeague.added = true;
                    }

                    return importedSleeperLeague;
                }
            );

            return {
                ...state,
                importSleeperLeagues: {
                    leagues: filteredLeagues,
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

        // FIND_ESPN_LEAGUE
        case LeagueActionTypes.FIND_ESPN_LEAGUE:
            return {
                ...state,
                isLoading: true,
            };

        case LeagueActionTypes.FIND_ESPN_LEAGUE_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                espnLeagueExternal: action.payload,
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
            };

        case LeagueActionTypes.ADD_ESPN_LEAGUE_SUCCESS:
            return {
                ...state,
            };

        case LeagueActionTypes.ADD_ESPN_LEAGUE_FAIL:
            return {
                ...state,
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
                    ...state.userLeagues,
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
                    ...state.userLeagues,
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
