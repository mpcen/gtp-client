import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import {
    storePreloadedLeagues,
    removeSleeperLeague,
} from './store/actionCreators';
import { SleeperLeague } from './store/storeTypes';

import { LeaguesCard } from './components/LeaguesCard';
import { RemoveLeagueOverlay } from './components/RemoveLeagueOverlay';

export const LeaguesScreen = () => {
    const dispatch = useDispatch();
    const { leagues, auth } = useSelector((state: RootState) => state);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState({} as SleeperLeague);

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
                setIsOverlayVisible={setIsOverlayVisible}
                setSelectedLeague={setSelectedLeague}
            />

            <RemoveLeagueOverlay
                selectedLeague={selectedLeague}
                isOverlayVisible={isOverlayVisible}
                removeSleeperLeague={removeSleeperLeague}
                setIsOverlayVisible={setIsOverlayVisible}
            />
        </View>
    );
};
