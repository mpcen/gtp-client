import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import truncate from 'truncate';

import { TeamInfoMap } from './GarbageTimeMatchupsList';
import { SleeperLeagueMatchup } from '../../leagues/store/storeTypes';

type Props = {
    teamNumber: number;
    teamInfoMap: TeamInfoMap;
    match: SleeperLeagueMatchup;
};

enum MatchWinner {
    Away = 'away',
    Home = 'home',
}

const cleanPoints = (points: number): string => points.toFixed(2);

const renderTeamName = (teamInfoMap: TeamInfoMap, teamId: number): string => {
    return teamInfoMap[teamId].teamName || teamInfoMap[teamId].displayName;
};

const boldIfWon = (teamSide: string, winner: MatchWinner) => {
    return teamSide === winner ? styles.bold : null;
};

const maybeReverseContainerDirection = (teamNumber: number) => {
    return teamNumber === 2 ? styles.matchupContainerReversed : null;
};

const maybeReverseTextAlignment = (teamNumber: number) => {
    return teamNumber === 2 ? styles.textAlignmentReversed : null;
};

export const GarbageTimeMatchupCard = ({
    teamNumber,
    match,
    teamInfoMap,
}: Props) => {
    return (
        <View
            style={[
                styles.cardContainer,
                match.winner === MatchWinner.Away
                    ? styles.matchWon
                    : styles.matchLost,
            ]}
        >
            {/* AWAY TEAM NAME AND POINTS */}
            <View
                style={[
                    styles.matchupContainer,
                    styles.awayMargin,
                    maybeReverseContainerDirection(teamNumber),
                ]}
            >
                {/* TEAM NAME */}
                <Text
                    style={[
                        styles.textStyle,
                        styles.teamNameStyle,
                        boldIfWon(match.winner, MatchWinner.Away),
                        maybeReverseTextAlignment(teamNumber),
                    ]}
                    allowFontScaling={false}
                >
                    {renderTeamName(teamInfoMap, match.away.teamId)}
                </Text>

                {/* POINTS */}
                <Text
                    style={[
                        styles.textStyle,
                        boldIfWon(match.winner, MatchWinner.Away),
                    ]}
                    allowFontScaling={false}
                >
                    {cleanPoints(match.away.totalPoints)}
                </Text>
            </View>

            {/* HOME TEAM NAME AND POINTS */}
            <View
                style={[
                    styles.matchupContainer,
                    maybeReverseContainerDirection(teamNumber),
                ]}
            >
                {/* TEAM NAME */}
                <Text
                    style={[
                        styles.textStyle,
                        styles.teamNameStyle,
                        boldIfWon(match.winner, MatchWinner.Home),
                        maybeReverseTextAlignment(teamNumber),
                    ]}
                    allowFontScaling={false}
                >
                    {renderTeamName(teamInfoMap, match.home.teamId)}
                </Text>

                {/* POINTS */}
                <Text
                    style={[
                        styles.textStyle,
                        boldIfWon(match.winner, MatchWinner.Home),
                    ]}
                    allowFontScaling={false}
                >
                    {cleanPoints(match.home.totalPoints)}
                </Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    cardContainer: {
        width: '45%',
        paddingTop: 20,
        paddingBottom: 20,
        paddingLeft: 8,
        paddingRight: 8,
        marginTop: 4,
        marginBottom: 4,
        borderRadius: 4,
    },
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
    textAlignmentReversed: {
        textAlign: 'right',
    },
    bold: {
        fontWeight: 'bold',
    },
    teamNameStyle: {
        marginRight: 4,
        maxHeight: 30,
        maxWidth: 90,
    },
    matchWon: {
        backgroundColor: '#D9EDD4',
    },
    matchLost: {
        backgroundColor: '#F4D4CD',
    },
});
