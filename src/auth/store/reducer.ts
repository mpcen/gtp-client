import { AuthActionTypes } from './actionTypes';
import { AuthDispatchTypes } from './dispatchTypes';

export type AuthState = {
    token: string;
    error: string;
    isLoading: boolean;
};

const INITIAL_STATE: AuthState = {
    token: '',
    error: '',
    isLoading: false,
};

export const authReducer = (
    state: AuthState = INITIAL_STATE,
    action: AuthDispatchTypes
): AuthState => {
    switch (action.type) {
        // RESOLVE_AUTH
        case AuthActionTypes.RESOLVE_AUTH_SUCCESS:
            return { ...state, token: action.payload.token, isLoading: false };
        case AuthActionTypes.RESOLVE_AUTH_FAIL:
            return { ...state, isLoading: false };

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
            return { ...state, token: '' };

        // CLEAR_ERRORS
        case AuthActionTypes.CLEAR_ERRORS:
            return { ...state, error: '' };

        // DEFAULT
        default:
            return state;
    }
};
