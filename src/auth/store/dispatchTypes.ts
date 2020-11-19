import { AuthActionTypes } from './actionTypes';
import {
    ESPNLeague,
    SleeperLeague,
    UserLeagues,
} from '../../leagues/store/storeTypes';
import { CurrentUser } from './storeTypes';

// RESOLVE_AUTH
type ResolveAuth_success = {
    type: AuthActionTypes.RESOLVE_AUTH_SUCCESS;
    payload: {
        token: string;
    };
};
type ResolveAuth_fail = {
    type: AuthActionTypes.RESOLVE_AUTH_FAIL;
};
type ResolveAuthDispatchTypes = ResolveAuth_success | ResolveAuth_fail;

// PRELOAD_DATA
type PreloadData = {
    type: AuthActionTypes.PRELOAD_DATA;
};
type PreloadData_success = {
    type: AuthActionTypes.PRELOAD_DATA_SUCCESS;
    payload: {
        currentUserInfo: CurrentUser;
        userSleeperLeagues: SleeperLeague[];
        userESPNLeagues: ESPNLeague[];
    };
};
type PreloadData_fail = {
    type: AuthActionTypes.PRELOAD_DATA_FAIL;
    payload: string;
};
type PreloadDataDispatchTypes =
    | PreloadData
    | PreloadData_success
    | PreloadData_fail;

// SIGN_UP
type Signup = {
    type: AuthActionTypes.SIGN_UP;
};
type Signup_success = {
    type: AuthActionTypes.SIGN_UP_SUCCESS;
    payload: {
        token: string;
    };
};
type Signup_fail = {
    type: AuthActionTypes.SIGN_UP_FAIL;
    payload: {
        error: string;
    };
};
type SignupDispatchTypes = Signup | Signup_success | Signup_fail;

// SIGN_IN
type Signin = {
    type: AuthActionTypes.SIGN_IN;
};
type Signin_success = {
    type: AuthActionTypes.SIGN_IN_SUCCESS;
    payload: {
        token: string;
    };
};
type Signin_fail = {
    type: AuthActionTypes.SIGN_IN_FAIL;
    payload: {
        error: string;
    };
};
type SigninDispatchTypes = Signin | Signin_success | Signin_fail;

// CLEAR_ERRORS
type ClearErrors = {
    type: AuthActionTypes.CLEAR_ERRORS;
};
type ClearErrorsDispatchTypes = ClearErrors;

// SIGN_OUT
type Signout = {
    type: AuthActionTypes.SIGN_OUT;
};
type SignoutDispatchTypes = Signout;

// RESET_PASSWORD_REQUEST
type ResetPasswordRequest = {
    type: AuthActionTypes.RESET_PASSWORD_REQUEST;
};
type ResetPasswordRequest_success = {
    type: AuthActionTypes.RESET_PASSWORD_REQUEST_SUCCESS;
    payload: {
        fullUrl: string;
        id: string;
        token: string;
    };
};
type ResetPasswordRequest_fail = {
    type: AuthActionTypes.RESET_PASSWORD_REQUEST_FAIL;
    payload: {
        error: string;
    };
};
type ResetPasswordRequestDispatchTypes =
    | ResetPasswordRequest
    | ResetPasswordRequest_success
    | ResetPasswordRequest_fail;

export type AuthDispatchTypes =
    | ResolveAuthDispatchTypes
    | PreloadDataDispatchTypes
    | SignupDispatchTypes
    | SigninDispatchTypes
    | ClearErrorsDispatchTypes
    | SignoutDispatchTypes
    | ResetPasswordRequestDispatchTypes;
