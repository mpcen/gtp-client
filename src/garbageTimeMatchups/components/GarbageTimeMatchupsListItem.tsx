import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { GarbageTimeMatchupCard } from './GarbageTimeMatchupCard';
import { TeamInfoMap } from './GarbageTimeMatchupsList';
import { CombinedGTMResult } from '../hooks/useGarbageTimeMatchups';

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
                matchupForTeam={1}
                teamInfoMap={teamInfoMap}
                match={combinedGTMResult.t1}
            />

            <View style={styles.weekContainer}>
                <Text style={styles.weekText}>
                    W{combinedGTMResult.t1.matchupWeek}
                </Text>
            </View>

            <GarbageTimeMatchupCard
                matchupForTeam={2}
                teamInfoMap={teamInfoMap}
                match={combinedGTMResult.t2}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    matchupContainer: {
        flexDirection: 'row',
    },
    weekContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '10%',
    },
    weekText: {
        fontSize: 12,
    },
});
