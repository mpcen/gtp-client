import React, { useEffect } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import { storePreloadedLeagues } from './store/actionCreators';
import { LeaguesCard } from './components/LeaguesCard';

export const LeaguesScreen = () => {
    const dispatch = useDispatch();
    const { leagues, auth } = useSelector((state: RootState) => state);

    useEffect(() => {
        if (auth.isDataPreloaded) {
            dispatch(storePreloadedLeagues(auth.preloadedLeagues.sleeper));
        }
    }, [auth.isDataPreloaded]);

    return (
        <View>
            <LeaguesCard
                platform='Sleeper'
                leagues={leagues.userLeagues.sleeper}
            />
        </View>
    );
};
