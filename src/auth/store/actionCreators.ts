import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Dispatch } from 'redux';
import * as EmailValidator from 'email-validator';
import Constants from 'expo-constants';

import { AuthActionTypes } from './actionTypes';
import { AuthDispatchTypes } from './dispatchTypes';
import { LeagueDispatchTypes } from '../../leagues/store/dispatchTypes';

const { API_URI } = Constants.manifest.extra;

export const resolveAuth = () => {
    return async (dispatch: Dispatch<AuthDispatchTypes>) => {
        const token = await AsyncStorage.getItem('gtp-token');

        if (token) {
            return dispatch({
                type: AuthActionTypes.RESOLVE_AUTH_SUCCESS,
                payload: { token },
            });
        }

        dispatch({ type: AuthActionTypes.RESOLVE_AUTH_FAIL });
    };
};

export const preloadData = () => {
    return async (
        dispatch: Dispatch<AuthDispatchTypes | LeagueDispatchTypes>
    ) => {
        const token = await AsyncStorage.getItem('gtp-token');

        dispatch({
            type: AuthActionTypes.PRELOAD_DATA,
        });

        try {
            const [currentUser, userSleeperLeagues] = await Promise.all([
                axios.get(`${API_URI}/api/users/currentuser`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }),
                axios.get(`${API_URI}/api/league/sleeper/userleagues`, {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }),
            ]);

            dispatch({
                type: AuthActionTypes.PRELOAD_DATA_SUCCESS,
                payload: {
                    currentUserInfo: currentUser.data.currentUser,
                    userSleeperLeagues: userSleeperLeagues.data,
                },
            });
        } catch (e) {
            dispatch({
                type: AuthActionTypes.PRELOAD_DATA_FAIL,
                payload: 'Error getting current user.',
            });
        }
    };
};

export const signUp = (
    email: string,
    password: string,
    confirmedPassword: string
) => {
    return async (dispatch: Dispatch<AuthDispatchTypes>) => {
        if (!password || !email) {
            return dispatch({
                type: AuthActionTypes.SIGN_UP_FAIL,
                payload: { error: 'Email and passwords are required' },
            });
        }

        if (!EmailValidator.validate(email)) {
            return dispatch({
                type: AuthActionTypes.SIGN_UP_FAIL,
                payload: { error: 'Invalid email' },
            });
        }

        if (password !== confirmedPassword) {
            return dispatch({
                type: AuthActionTypes.SIGN_UP_FAIL,
                payload: { error: 'Passwords do not match' },
            });
        }

        dispatch({ type: AuthActionTypes.SIGN_UP });

        try {
            const response = await axios.post(`${API_URI}/api/users/signup`, {
                email,
                password,
                confirmedPassword,
            });

            await AsyncStorage.setItem('gtp-token', response.data.token);

            dispatch({
                type: AuthActionTypes.SIGN_UP_SUCCESS,
                payload: {
                    token: response.data.token,
                },
            });
        } catch (err) {
            dispatch({
                type: AuthActionTypes.SIGN_UP_FAIL,
                payload: {
                    error: 'Error signing up',
                },
            });
        }
    };
};

export const signIn = (email: string, password: string) => {
    return async (dispatch: Dispatch<AuthDispatchTypes>) => {
        dispatch({ type: AuthActionTypes.SIGN_IN });

        try {
            const response = await axios.post(`${API_URI}/api/users/signin`, {
                email,
                password,
            });

            await AsyncStorage.setItem('gtp-token', response.data.token);

            dispatch({
                type: AuthActionTypes.SIGN_IN_SUCCESS,
                payload: {
                    token: response.data.token,
                },
            });
        } catch (err) {
            dispatch({
                type: AuthActionTypes.SIGN_IN_FAIL,
                payload: {
                    error: err.response.data.errors[0].message,
                },
            });
        }
    };
};

export const signOut = () => {
    return async (dispatch: Dispatch<AuthDispatchTypes>) => {
        await AsyncStorage.removeItem('gtp-token');

        dispatch({ type: AuthActionTypes.SIGN_OUT });
    };
};

export const resetPasswordRequest = (email: string) => {
    return async (dispatch: Dispatch<AuthDispatchTypes>) => {
        dispatch({ type: AuthActionTypes.RESET_PASSWORD_REQUEST });

        if (!email) {
            return dispatch({
                type: AuthActionTypes.RESET_PASSWORD_REQUEST_FAIL,
                payload: {
                    error: 'Error resetting password',
                },
            });
        }

        try {
            const response = await axios.post(
                `${API_URI}/api/users/resetpassword`,
                { email }
            );

            dispatch({
                type: AuthActionTypes.RESET_PASSWORD_REQUEST_SUCCESS,
                payload: {
                    fullUrl: response.data.fullUrl,
                    id: response.data.id,
                    token: response.data.token,
                },
            });
        } catch (err) {
            dispatch({
                type: AuthActionTypes.RESET_PASSWORD_REQUEST_FAIL,
                payload: {
                    error: err.response.data.errors[0].message,
                },
            });
        }
    };
};

export const clearErrors = () => {
    return (dispatch: Dispatch<AuthDispatchTypes>) => {
        dispatch({ type: AuthActionTypes.CLEAR_ERRORS });
    };
};
