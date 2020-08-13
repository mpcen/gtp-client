import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { SleeperLeagueMatchup } from '../../leagues/store/storeTypes';
import { TeamDestination } from '../types';

import { TeamInfoMap } from './GarbageTimeMatchupsList';

type Props = {
    matchupForTeam: number;
    teamDestination: TeamDestination;
    match: SleeperLeagueMatchup;
    teamInfoMap: TeamInfoMap;
};

const maybeReverseContainerDirection = (matchupForTeam: number) => {
    return matchupForTeam == 2 ? styles.matchupContainerReversed : null;
};

const boldIfWon = (winner: string, teamDestination: TeamDestination) => {
    return teamDestination === winner ? styles.bold : null;
};

const maybeReverseTextAlignment = (teamDestination: TeamDestination) => {
    return teamDestination === TeamDestination.Home
        ? styles.textAlignmentReversed
        : null;
};

const renderTeamName = (teamInfoMap: TeamInfoMap, teamId: number): string => {
    return teamInfoMap[teamId].teamName || teamInfoMap[teamId].displayName;
};

const cleanPoints = (
    match: SleeperLeagueMatchup,
    teamDestination: TeamDestination
): string => {
    const points =
        teamDestination === TeamDestination.Away
            ? match.away.totalPoints
            : match.home.totalPoints;
    return points.toFixed(2);
};

export const GarbageTimeMatchupCardItem = ({
    matchupForTeam,
    teamDestination,
    match,
    teamInfoMap,
}: Props) => {
    return (
        <View
            style={[
                styles.matchupContainer,
                teamDestination === TeamDestination.Away
                    ? styles.awayMargin
                    : null,
                maybeReverseContainerDirection(matchupForTeam),
            ]}
        >
            {/* NAME */}
            <Text
                style={[
                    styles.textStyle,
                    styles.teamNameStyle,
                    boldIfWon(match.winner, teamDestination),
                    maybeReverseTextAlignment(teamDestination),
                ]}
                allowFontScaling={false}
            >
                {renderTeamName(
                    teamInfoMap,
                    teamDestination === TeamDestination.Away
                        ? match.away.teamId
                        : match.home.teamId
                )}
            </Text>

            {/* POINTS */}
            <Text
                style={[
                    styles.textStyle,
                    boldIfWon(match.winner, teamDestination),
                ]}
                allowFontScaling={false}
            >
                {cleanPoints(match, teamDestination)}
            </Text>
        </View>
    );
};

const styles = StyleSheet.create({
    matchupContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    awayMargin: { marginBottom: 8 },
    matchupContainerReversed: {
        flexDirection: 'row-reverse',
    },
    textStyle: {
        fontSize: 10,
    },
    teamNameStyle: {
        marginRight: 4,
        maxHeight: 30,
        maxWidth: 90,
    },
    bold: {
        fontWeight: 'bold',
    },
    textAlignmentReversed: {
        textAlign: 'right',
    },
});
