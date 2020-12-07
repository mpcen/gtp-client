import React, { SetStateAction } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';

import { SleeperLeagueInfoListItem } from '../../../leagues/components/sleeper/SleeperLeagueInfoListItem';
import { SleeperLeague } from '../../../leagues/store/storeTypes';
import { LeaguePlatform } from '../../../leagues/types';

type Props = {
    leagues: SleeperLeague[];
    setLeaguePlatform: React.Dispatch<SetStateAction<LeaguePlatform>>;
    setSelectedSleeperLeague: React.Dispatch<SetStateAction<SleeperLeague>>;
};

export const SleeperLeagueSelectRoute = ({
    leagues,
    setLeaguePlatform,
    setSelectedSleeperLeague,
}: Props) => (
    <View style={styles.container}>
        <FlatList
            data={leagues}
            keyExtractor={(item) => item.leagueId}
            renderItem={({ item }: { item: SleeperLeague }) => (
                <SleeperLeagueInfoListItem
                    leagueName={item.leagueName}
                    seasonId={item.seasonId}
                    leagueAvatar={item.avatar}
                    totalTeams={item.teams.length}
                    isLoading={false}
                    onItemPressCallback={() => {
                        setLeaguePlatform(LeaguePlatform.Sleeper);
                        setSelectedSleeperLeague(item);
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
