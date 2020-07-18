import { LeagueActionTypes } from './actionTypes';
import { LeagueDispatchTypes } from './dispatchTypes';
import { LeagueState, ImportedSleeperLeague } from './storeTypes';

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
                    if (
                        league.leagueId ===
                        action.payload.addedSleeperLeague.leagueId
                    ) {
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
                    sleeper: [
                        ...state.userLeagues.sleeper,
                        action.payload.addedSleeperLeague,
                    ],
                },
            };
        case LeagueActionTypes.ADD_SLEEPER_LEAGUE_FAIL:
            return {
                ...state,
                isLoading: false,
                error: 'Error adding Sleeper league',
            };

        // DEFAULT
        default:
            return state;
    }
};
