import { LeagueActionTypes } from './actionTypes';
import { LeagueDispatchTypes } from './dispatchTypes';

export type ImportedSleeperLeague = {
    leagueId: string;
    seasonId: string;
    name: string;
    avatar: string | null;
    totalTeams: number;
};

export type LeagueState = {
    importSleeperLeagues: {
        leagues: ImportedSleeperLeague[];
    };
    isLoading: boolean;
    error: string;
};

const INITIAL_STATE: LeagueState = {
    importSleeperLeagues: {
        leagues: [],
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
                    leagues: action.payload.leagues,
                },
                isLoading: false,
                error: '',
            };
        case LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_FAIL:
            return {
                ...state,
                isLoading: false,
                error: action.payload.error,
            };

        // DEFAULT
        default:
            return state;
    }
};
