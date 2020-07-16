import axios from 'axios';

import { AsyncStorage } from 'react-native';
import { Dispatch } from 'redux';

import { AuthActionTypes } from './actionTypes';
import { AuthDispatchTypes } from './dispatchTypes';

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

export const signUp = (
    email: string,
    password: string,
    confirmedPassword: string
) => {
    return async (dispatch: Dispatch<AuthDispatchTypes>) => {
        if (password !== confirmedPassword) {
            return dispatch({
                type: AuthActionTypes.SIGN_UP_FAIL,
                payload: { error: 'Passwords do not match' },
            });
        }

        dispatch({ type: AuthActionTypes.SIGN_UP });

        try {
            const response = await axios.post(
                // `${config.API_URL}/api/users/signup`, // TODO
                `http://192.168.0.210:5000/api/users/signup`,
                {
                    email,
                    password,
                }
            );

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
            const response = await axios.post(
                // `${config.API_URL}/api/users/signin`,// TODO
                `http://192.168.0.210:5000/api/users/signin`,
                {
                    email,
                    password,
                }
            );

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
                    error: 'Error signing in',
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

export const clearErrors = () => {
    return (dispatch: Dispatch<AuthDispatchTypes>) => {
        dispatch({ type: AuthActionTypes.CLEAR_ERRORS });
    };
};
