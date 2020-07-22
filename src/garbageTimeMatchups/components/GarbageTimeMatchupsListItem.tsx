import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { GarbageTimeMatchupCard } from './GarbageTimeMatchupCard';
import { TeamInfoMap } from './GarbageTimeMatchupsList';
import { CombinedGTMResult } from '../useGarbageTimeMatchups';

type Props = {
    teamInfoMap: TeamInfoMap;
    combinedGTMResult: CombinedGTMResult;
};

export const GarbageTimeMatchupsListItem = ({
    teamInfoMap,
    combinedGTMResult,
}: Props) => {
    return (
        <View
            key={combinedGTMResult.t1.matchupWeek}
            style={styles.matchupContainer}
        >
            <GarbageTimeMatchupCard
                teamInfoMap={teamInfoMap}
                match={combinedGTMResult.t1}
            />

            <View style={styles.weekContainer}>
                <Text>W{combinedGTMResult.t1.matchupWeek}</Text>
            </View>

            <GarbageTimeMatchupCard
                teamInfoMap={teamInfoMap}
                match={combinedGTMResult.t2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    matchupContainer: {
        flexDirection: 'row',
        borderBottomWidth: 0.24,
        paddingTop: 20,
        paddingBottom: 18,
    },
    weekContainer: {
        justifyContent: 'center',
        width: '10%',
    },
});
