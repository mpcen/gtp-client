import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { StackNavigationProp } from '@react-navigation/stack';
import { useSelector } from 'react-redux';
// import { AsyncStorage } from 'react-native';

import { RootState } from '../store/rootReducer';
import { resolveAuth } from '../auth/store/actionCreators';

import { PreloadingDataScreen } from '../auth/PreloadingDataScreen';
import { AuthStackNavigator } from './navigators/AuthStackNavigator';
import { BottomTabNavigator } from './navigators/BottomTabNavigator';

export type LeaguesStackParamList = {
    Leagues: undefined;
    ImportSleeperLeagues: undefined;
    ImportESPNLeagues: undefined;
};

export type LeaguesScreenNavigationProp = StackNavigationProp<
    LeaguesStackParamList,
    'Leagues'
>;

export const Navigator = () => {
    const [isSyntheticDelayEnabled, setIssyntheticDelayEnabled] = useState(
        true
    );
    const { token, isResolvingAuth, isDataPreloaded } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useDispatch();

    // Emergency Dev-Purposes Only
    //AsyncStorage.removeItem('gtp-token');

    // Checking to see if we have an auth token stored
    useEffect(() => {
        if (isResolvingAuth) {
            dispatch(resolveAuth());
        }
    }, [isResolvingAuth]);

    // If we have an auth token but haven't attempted to fetch user data yet
    useEffect(() => {
        if (token && !isDataPreloaded) {
            setTimeout(() => {
                setIssyntheticDelayEnabled(false);
            }, 1500);
        }
    }, [token]);

    if (isResolvingAuth) {
        return null;
    }

    // If we've authenticated, fetched the user data, and the synthetic delay is done, render the main stack
    if (token && !isSyntheticDelayEnabled && isDataPreloaded) {
        return <BottomTabNavigator />;
    }

    // If no token, and done trying to resolve auth, render Auth stack
    if (!token && !isResolvingAuth) {
        return <AuthStackNavigator />;
    }

    // If we're still trying to determine auth or fetching user data, render a loader
    return <PreloadingDataScreen />;
};
