import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { TeamInfoMap } from './GarbageTimeMatchupsList';
import { SleeperLeagueMatchup } from '../../leagues/store/storeTypes';

type Props = {
    teamInfoMap: TeamInfoMap;
    match: SleeperLeagueMatchup;
};

const cleanPoints = (points: number): string => points.toFixed(2);

export const GarbageTimeMatchupCard = ({ match, teamInfoMap }: Props) => {
    return (
        <View style={styles.cardContainer}>
            <View style={styles.matchupContainer}>
                <Text style={[styles.textStyle, styles.teamNameStyle]}>
                    {teamInfoMap[match.away.teamId.toString()].teamName ||
                        teamInfoMap[match.away.teamId.toString()].displayName}
                </Text>
                <Text style={styles.textStyle}>
                    {cleanPoints(match.away.totalPoints)}
                </Text>
            </View>

            <View style={styles.matchupContainer}>
                <Text style={[styles.textStyle, styles.teamNameStyle]}>
                    {teamInfoMap[match.home.teamId.toString()].teamName ||
                        teamInfoMap[match.home.teamId.toString()].displayName}
                </Text>
                <Text style={styles.textStyle}>
                    {cleanPoints(match.home.totalPoints)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '45%',
    },
    matchupContainer: {
        flexDirection: 'row',
    },
    textStyle: {
        fontSize: 10,
    },
    teamNameStyle: {
        marginRight: 4,
    },
});
