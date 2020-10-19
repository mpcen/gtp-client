import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import { removeSleeperLeague } from './store/actionCreators';
import { SleeperLeague } from './store/storeTypes';
import { LeaguePlatform } from './types';

import { LeagueModule } from './components/LeagueModule';
import { RemoveLeagueOverlay } from './components/RemoveLeagueOverlay';
import { Color } from '../common/styles/colors';

export const LeaguesScreen = () => {
    const { leagues, auth } = useSelector((state: RootState) => state);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState({} as SleeperLeague);

    return (
        <View style={styles.container}>
            <LeagueModule
                platform={LeaguePlatform.Sleeper}
                leagues={leagues.userLeagues.sleeper}
                setIsOverlayVisible={setIsOverlayVisible}
                setSelectedLeague={setSelectedLeague}
                isLoading={!auth.isDataPreloaded}
            />

            {/* <LeagueModule
                platform={LeaguePlatform.ESPN}
                leagues={[]}
                setIsOverlayVisible={setIsOverlayVisible}
                setSelectedLeague={setSelectedLeague}
            /> */}

            <RemoveLeagueOverlay
                selectedLeague={selectedLeague}
                isOverlayVisible={isOverlayVisible}
                removeSleeperLeague={removeSleeperLeague}
                setIsOverlayVisible={setIsOverlayVisible}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.PureWhite },
});
