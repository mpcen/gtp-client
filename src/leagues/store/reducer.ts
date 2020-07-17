import { LeagueActionTypes } from './actionTypes';
import { LeagueDispatchTypes } from './dispatchTypes';

export type LeagueState = {
    addLeagueState: {
        username: string;
        displayname: string;
        avatar: string;
    };
    isLoading: boolean;
    error: string;
};

const INITIAL_STATE: LeagueState = {
    addLeagueState: {
        username: '',
        displayname: '',
        avatar: '',
    },
    isLoading: false,
    error: '',
};

export const leagueReducer = (
    state: LeagueState = INITIAL_STATE,
    action: LeagueDispatchTypes
): LeagueState => {
    switch (action.type) {
        // FIND_SLEEPER_USER
        case LeagueActionTypes.FIND_SLEEPER_USER:
            return {
                ...state,
                isLoading: true,
            };
        case LeagueActionTypes.FIND_SLEEPER_USER_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                addLeagueState: {
                    username: action.payload.username,
                    displayname: action.payload.displayName,
                    avatar: action.payload.avatar,
                },
            };
        case LeagueActionTypes.FIND_SLEEPER_USER_FAIL:
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
