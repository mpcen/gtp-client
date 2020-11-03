import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import { removeSleeperLeague } from './store/actionCreators';
import { SleeperLeague } from './store/storeTypes';

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
                leagues={leagues.userLeagues.sleeper}
                setIsOverlayVisible={setIsOverlayVisible}
                setSelectedLeague={setSelectedLeague}
                isLoading={!auth.isDataPreloaded}
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

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.PureWhite },
    leaguesHeaderButtonStyle: {
        marginRight: 16,
        borderWidth: 1,
        borderRadius: 7,
        padding: 2,
    },
});
