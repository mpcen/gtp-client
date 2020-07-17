import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Dispatch } from 'redux';

import { LeagueActionTypes } from './actionTypes';
import { LeagueDispatchTypes } from './dispatchTYpes';

export const findUser = (username: string) => {
    return async (dispatch: Dispatch<LeagueDispatchTypes>) => {
        const token = await AsyncStorage.getItem('gtp-token');

        if (!token) {
            return dispatch({
                type: LeagueActionTypes.FIND_SLEEPER_USER_FAIL,
                payload: {
                    error: 'You must be logged in',
                },
            });
        }

        dispatch({ type: LeagueActionTypes.FIND_SLEEPER_USER });

        try {
            const response = await axios.post(
                `http://192.168.0.210:5000/api/league/sleeper/user/${username}`,
                {
                    jwt: token,
                }
            );

            dispatch({
                type: LeagueActionTypes.FIND_SLEEPER_USER_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: LeagueActionTypes.FIND_SLEEPER_USER_FAIL,
                payload: {
                    error: 'User not found',
                },
            });
        }
    };
};
