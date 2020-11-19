import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

import { RootState } from '../store/rootReducer';
import { removeSleeperLeague } from './store/actionCreators';
import { SleeperLeague } from './store/storeTypes';

import { LeagueModule } from './components/LeagueModule';
import { RemoveLeagueOverlay } from './components/RemoveLeagueOverlay';
import { Color } from '../common/styles/colors';
import { LeaguePlatform } from './types';

export const LeaguesScreen = () => {
    const route = useRoute<any>();
    const { leagues, auth } = useSelector((state: RootState) => state);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState({} as SleeperLeague);
    const platform: LeaguePlatform = route.params?.platform!;

    return (
        <View style={styles.container}>
            <LeagueModule
                leaguePlatform={platform}
                leagues={
                    platform === LeaguePlatform.Sleeper
                        ? leagues.userLeagues.sleeper
                        : leagues.userLeagues.espn
                }
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
