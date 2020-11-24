import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useRoute } from '@react-navigation/native';

import { RootState } from '../store/rootReducer';
import { ESPNLeague, League, SleeperLeague } from './store/storeTypes';

import { LeagueModule } from './components/LeagueModule';
import { RemoveLeagueOverlay } from './components/RemoveLeagueOverlay';
import { Color } from '../common/styles/colors';
import { LeaguePlatform } from './types';
import { OverlayTypes } from '../garbageTimeMatchups/types';

export const LeaguesScreen = () => {
    const route = useRoute<any>();
    const { leagues, auth } = useSelector((state: RootState) => state);
    const [selectedLeague, setSelectedLeague] = useState(
        {} as SleeperLeague | ESPNLeague
    );
    const [overlay, setOverlay] = useState(OverlayTypes.None);

    const leaguePlatform: LeaguePlatform = route.params?.platform!;

    return (
        <View style={styles.container}>
            <LeagueModule
                leaguePlatform={leaguePlatform}
                leagues={
                    leaguePlatform === LeaguePlatform.Sleeper
                        ? leagues.userLeagues.sleeper
                        : leagues.userLeagues.espn
                }
                setOverlay={() => setOverlay(OverlayTypes.RemoveLeague)}
                setSelectedLeague={setSelectedLeague}
                isLoading={!auth.isDataPreloaded}
            />

            {/* OVERLAYS */}
            <RemoveLeagueOverlay
                leaguePlatform={leaguePlatform}
                league={{
                    leagueId: selectedLeague.leagueId,
                    seasonId: selectedLeague.seasonId,
                    leagueName: selectedLeague.leagueName,
                }}
                isOverlayVisible={overlay === OverlayTypes.RemoveLeague}
                closeOverlay={() => setOverlay(OverlayTypes.None)}
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
