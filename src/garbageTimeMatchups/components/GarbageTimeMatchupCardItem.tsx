import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { SleeperLeagueMatchup } from '../../leagues/store/storeTypes';
import { TeamDestination } from '../types';

import { TeamInfoMap } from './GarbageTimeMatchupsList';
import { Avatar } from 'react-native-elements';

type Props = {
    matchupForTeam: number;
    teamDestination: TeamDestination;
    match: SleeperLeagueMatchup;
    teamInfoMap: TeamInfoMap;
};

const maybeReverseContainerDirection = (matchupForTeam: number) => {
    return matchupForTeam === 2 ? styles.matchupContainerReversed : null;
};

const boldIfWon = (winner: string, teamDestination: TeamDestination) => {
    return teamDestination === winner ? styles.bold : null;
};

const maybeReverseTextAlignment = (matchupForTeam: number) => {
    return matchupForTeam === 2 ? styles.textAlignmentReversed : null;
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

const spaceTeamName = (matchupForTeam: number) => {
    return matchupForTeam === 2
        ? styles.teamNameStyleTeamTwo
        : styles.teamNameStyleTeamOne;
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
            <View
                style={[
                    { flexDirection: 'row' },
                    maybeReverseContainerDirection(matchupForTeam),
                ]}
            >
                {/* AVATAR */}
                <Avatar
                    containerStyle={{
                        width: 14,
                        height: 14,
                    }}
                    rounded
                    source={{
                        uri: `https://sleepercdn.com/avatars/thumbs/${
                            teamInfoMap[match[teamDestination].teamId].avatar
                        }`,
                    }}
                />

                {/* NAME */}
                <Text
                    style={[
                        styles.textStyle,
                        styles.teamNameStyle,
                        boldIfWon(match.winner, teamDestination),
                        spaceTeamName(matchupForTeam),
                        maybeReverseTextAlignment(matchupForTeam),
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
            </View>

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
        maxHeight: 30,
        maxWidth: 90,
    },
    teamNameStyleTeamOne: {
        marginLeft: 4,
    },
    teamNameStyleTeamTwo: {
        marginRight: 4,
    },
    bold: {
        fontWeight: 'bold',
    },
    textAlignmentReversed: {
        textAlign: 'right',
    },
});
