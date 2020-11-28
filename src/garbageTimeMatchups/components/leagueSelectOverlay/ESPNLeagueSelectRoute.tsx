import React, { SetStateAction } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { ESPNLeagueInfoListItem } from '../../../leagues/components/espn/ESPNLeagueInfoListItem';
import { ESPNLeague } from '../../../leagues/store/storeTypes';
import { LeaguePlatform } from '../../../leagues/types';

type Props = {
    leagues: ESPNLeague[];
    setLeaguePlatform: React.Dispatch<SetStateAction<LeaguePlatform>>;
    setSelectedESPNLeague: React.Dispatch<SetStateAction<ESPNLeague>>;
};

export const ESPNLeagueSelectRoute = ({
    leagues,
    setLeaguePlatform,
    setSelectedESPNLeague,
}: Props) => (
    <View style={styles.container}>
        <FlatList
            data={leagues}
            keyExtractor={(item) => item.leagueId}
            renderItem={({ item }: { item: ESPNLeague }) => (
                <ESPNLeagueInfoListItem
                    leagueName={item.leagueName}
                    seasonId={item.seasonId}
                    totalTeams={item.teams.length}
                    isLoading={false}
                    onItemPressCallback={() => {
                        setLeaguePlatform(LeaguePlatform.ESPN);
                        setSelectedESPNLeague(item);
                    }}
                />
            )}
        />
    </View>
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
