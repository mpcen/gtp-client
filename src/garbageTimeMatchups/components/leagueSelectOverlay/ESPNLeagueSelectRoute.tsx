import React from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { ESPNLeagueInfoListItem } from '../../../leagues/components/espn/ESPNLeagueInfoListItem';
import { ESPNLeague } from '../../../leagues/store/storeTypes';

type Props = {
    leagues: ESPNLeague[];
};

export const ESPNLeagueSelectRoute = ({ leagues }: Props) => (
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
