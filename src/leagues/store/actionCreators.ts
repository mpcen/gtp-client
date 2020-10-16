import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Dispatch } from 'redux';
import Constants from 'expo-constants';

import { LeagueActionTypes } from './actionTypes';
import { LeagueDispatchTypes } from './dispatchTypes';
import { ImportedSleeperLeague, SleeperLeague } from './storeTypes';

const { API_URI } = Constants.manifest.extra;

export const findSleeperLeaguesForUser = (username: string) => {
    return async (dispatch: Dispatch<LeagueDispatchTypes>) => {
        const token = await AsyncStorage.getItem('gtp-token');

        dispatch({ type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER });

        try {
            const response = await axios.get(
                `${API_URI}/api/league/sleeper/leagues/${username}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch({
                type: LeagueActionTypes.FIND_SLEEPER_LEAGUES_FOR_USER_SUCCESS,
                payload: response.data.map((league: ImportedSleeperLeague) => ({
                    ...league,
                    added: false,
                })),
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

export const addSleeperLeague = (leagueId: string) => {
    return async (dispatch: Dispatch<LeagueDispatchTypes>) => {
        const token = await AsyncStorage.getItem('gtp-token');

        dispatch({ type: LeagueActionTypes.ADD_SLEEPER_LEAGUE });

        try {
            const response = await axios.post(
                `${API_URI}/api/addleague/sleeper`,
                { leagueId },
                { headers: { authorization: `Bearer ${token}` } }
            );

            dispatch({
                type: LeagueActionTypes.ADD_SLEEPER_LEAGUE_SUCCESS,
                payload: {
                    ...response.data,
                    added: true,
                },
            });
        } catch (e) {
            dispatch({
                type: LeagueActionTypes.ADD_SLEEPER_LEAGUE_FAIL,
                payload: {
                    error: 'Error adding Sleeper league',
                },
            });
        }
    };
};

export const removeSleeperLeague = (leagueId: string) => {
    return async (dispatch: Dispatch<LeagueDispatchTypes>) => {
        const token = await AsyncStorage.getItem('gtp-token');

        dispatch({ type: LeagueActionTypes.REMOVE_SLEEPER_LEAGUE });

        try {
            await axios.delete(`${API_URI}/api/removeleague/sleeper`, {
                headers: { authorization: `Bearer ${token}` },
                data: { leagueId },
            });

            dispatch({
                type: LeagueActionTypes.REMOVE_SLEEPER_LEAGUE_SUCCESS,
                payload: { leagueId },
            });
        } catch (e) {
            dispatch({
                type: LeagueActionTypes.REMOVE_SLEEPER_LEAGUE_FAIL,
                payload: {
                    error: 'Error removing Sleeper league',
                },
            });
        }
    };
};

export const storePreloadedLeagues = (
    preloadedSleeperLeagues: SleeperLeague[]
) => async (dispatch: Dispatch<LeagueDispatchTypes>) => {
    dispatch({
        type: LeagueActionTypes.STORE_PRELOADED_LEAGUES,
        payload: preloadedSleeperLeagues,
    });
};
