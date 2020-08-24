import { AuthActionTypes } from './actionTypes';
import { AuthDispatchTypes } from './dispatchTypes';
import { SleeperLeague } from '../../leagues/store/storeTypes';

export type AuthState = {
    token: string;
    error: string;
    isLoading: boolean;
    isResolvingAuth: boolean;
    isPreloadingData: boolean;
    isDataPreloaded: boolean;
    preloadedLeagues: {
        sleeper: SleeperLeague[];
    };
    resetPassword: {
        fullUrl: string;
        id: string;
        token: string;
    };
};

const INITIAL_STATE: AuthState = {
    token: '',
    error: '',
    isLoading: false,
    isResolvingAuth: true,
    isPreloadingData: false,
    isDataPreloaded: false,
    preloadedLeagues: {
        sleeper: [],
    },
    resetPassword: {
        fullUrl: '',
        id: '',
        token: '',
    },
};

export const authReducer = (
    state: AuthState = INITIAL_STATE,
    action: AuthDispatchTypes
): AuthState => {
    switch (action.type) {
        // RESOLVE_AUTH
        case AuthActionTypes.RESOLVE_AUTH_SUCCESS:
            return {
                ...state,
                token: action.payload.token,
                isResolvingAuth: false,
            };
        case AuthActionTypes.RESOLVE_AUTH_FAIL:
            return { ...state, isResolvingAuth: false };
        // PRELOAD_DATA
        case AuthActionTypes.PRELOAD_DATA:
            return {
                ...state,
                isPreloadingData: true,
            };
        case AuthActionTypes.PRELOAD_DATA_SUCCESS:
            return {
                ...state,
                isPreloadingData: false,
                isDataPreloaded: true,
                preloadedLeagues: {
                    sleeper: action.payload,
                },
            };
        // SIGN_UP
        case AuthActionTypes.SIGN_UP:
            return { ...state, isLoading: true, error: '' };
        case AuthActionTypes.SIGN_UP_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                token: action.payload.token,
            };
        case AuthActionTypes.SIGN_UP_FAIL:
            return { ...state, isLoading: false, error: action.payload.error };

        // SIGN_IN
        case AuthActionTypes.SIGN_IN:
            return { ...state, isLoading: true, error: '' };
        case AuthActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                token: action.payload.token,
            };
        case AuthActionTypes.SIGN_IN_FAIL:
            return { ...state, isLoading: false, error: action.payload.error };

        // SIGN_OUT
        case AuthActionTypes.SIGN_OUT:
            return { ...INITIAL_STATE };

        // CLEAR_ERRORS
        case AuthActionTypes.CLEAR_ERRORS:
            return { ...state, error: '' };

        // RESET_PASSWORD_REQUEST
        case AuthActionTypes.RESET_PASSWORD_REQUEST:
            return { ...state, isLoading: true, error: '' };
        case AuthActionTypes.RESET_PASSWORD_REQUEST_SUCCESS:
            return {
                ...state,
                isLoading: false,
                error: '',
                resetPassword: {
                    fullUrl: action.payload.fullUrl,
                    id: action.payload.id,
                    token: action.payload.token,
                },
            };
        case AuthActionTypes.RESET_PASSWORD_REQUEST_FAIL:
            return { ...state, isLoading: false, error: action.payload.error };

        // DEFAULT
        default:
            return state;
    }
};
