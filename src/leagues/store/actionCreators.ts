import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Dispatch } from 'redux';

import { LeagueActionTypes } from './actionTypes';
import { LeagueDispatchTypes } from './dispatchTYpes';

export const findSleeperLeaguesForUser = (username: string) => {
    return async (dispatch: Dispatch<LeagueDispatchTypes>) => {
        const token = await AsyncStorage.getItem('gtp-token');

        if (!token) {
            return dispatch({
                type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_FAIL,
                payload: {
                    error: 'You must be logged in',
                },
            });
        }

        dispatch({ type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER });

        try {
            const response = await axios.get(
                `http://192.168.0.210:5000/api/league/sleeper/leagues/${username}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch({
                type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_SUCCESS,
                payload: {
                    leagues: response.data,
                },
            });
        } catch (e) {
            dispatch({
                type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_FAIL,
                payload: {
                    error: 'User not found',
                },
            });
        }
    };
};
