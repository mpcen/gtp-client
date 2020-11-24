import axios from 'axios';
import { AsyncStorage } from 'react-native';
import { Dispatch } from 'redux';
import Constants from 'expo-constants';

import { LeagueActionTypes } from './actionTypes';
import { LeagueDispatchTypes } from './dispatchTypes';
import { SleeperLeagueExternal } from './storeTypes';

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
                payload: response.data.map((league: SleeperLeagueExternal) => ({
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

export const findESPNLeague = (leagueId: string, seasonId: string) => {
    return async (dispatch: Dispatch<LeagueDispatchTypes>) => {
        const token = await AsyncStorage.getItem('gtp-token');

        dispatch({ type: LeagueActionTypes.FIND_ESPN_LEAGUE });

        try {
            const response = await axios.get(
                `${API_URI}/api/findleague/espn?leagueId=${leagueId}&seasonId=${seasonId}`,
                {
                    headers: {
                        authorization: `Bearer ${token}`,
                    },
                }
            );

            dispatch({
                type: LeagueActionTypes.FIND_ESPN_LEAGUE_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: LeagueActionTypes.FIND_ESPN_LEAGUE_FAIL,
                payload: {
                    error: 'League not found',
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

export const addESPNLeague = (leagueId: string, seasonId: string) => {
    return async (dispatch: Dispatch<LeagueDispatchTypes>) => {
        const token = await AsyncStorage.getItem('gtp-token');

        dispatch({ type: LeagueActionTypes.ADD_ESPN_LEAGUE });

        try {
            const response = await axios.post(
                `${API_URI}/api/addleague/espn`,
                { leagueId, seasonId },
                { headers: { authorization: `Bearer ${token}` } }
            );

            dispatch({
                type: LeagueActionTypes.ADD_ESPN_LEAGUE_SUCCESS,
                payload: response.data,
            });
        } catch (e) {
            dispatch({
                type: LeagueActionTypes.ADD_ESPN_LEAGUE_FAIL,
                payload: {
                    error: 'Error adding ESPN league',
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

export const removeESPNLeague = (leagueId: string, seasonId: string) => {
    return async (dispatch: Dispatch<LeagueDispatchTypes>) => {
        const token = await AsyncStorage.getItem('gtp-token');

        dispatch({ type: LeagueActionTypes.REMOVE_ESPN_LEAGUE });

        try {
            await axios.delete(`${API_URI}/api/removeleague/espn`, {
                headers: { authorization: `Bearer ${token}` },
                data: { leagueId, seasonId },
            });

            dispatch({
                type: LeagueActionTypes.REMOVE_ESPN_LEAGUE_SUCCESS,
                payload: { leagueId, seasonId },
            });
        } catch (e) {
            debugger;
            dispatch({
                type: LeagueActionTypes.REMOVE_ESPN_LEAGUE_FAIL,
                payload: {
                    error: 'Error removing ESPN league',
                },
            });
        }
    };
};
