import { AuthActionTypes } from './actionTypes';

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

export type AuthDispatchTypes =
    | ResolveAuthDispatchTypes
    | SignupDispatchTypes
    | SigninDispatchTypes
    | ClearErrorsDispatchTypes
    | SignoutDispatchTypes;
