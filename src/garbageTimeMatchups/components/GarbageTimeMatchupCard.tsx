import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

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
            <View
                style={[
                    styles.matchupContainer,
                    maybeReverseContainerDirection(teamNumber),
                ]}
            >
                <Text
                    style={[
                        styles.textStyle,
                        styles.teamNameStyle,
                        boldIfWon(match.winner, MatchWinner.Away),
                    ]}
                >
                    {renderTeamName(teamInfoMap, match.away.teamId)}
                </Text>
                <Text
                    style={[
                        styles.textStyle,
                        boldIfWon(match.winner, MatchWinner.Away),
                    ]}
                >
                    {cleanPoints(match.away.totalPoints)}
                </Text>
            </View>

            <View
                style={[
                    styles.matchupContainer,
                    maybeReverseContainerDirection(teamNumber),
                ]}
            >
                <Text
                    style={[
                        styles.textStyle,
                        styles.teamNameStyle,
                        boldIfWon(match.winner, MatchWinner.Home),
                    ]}
                >
                    {renderTeamName(teamInfoMap, match.home.teamId)}
                </Text>
                <Text
                    style={[
                        styles.textStyle,
                        boldIfWon(match.winner, MatchWinner.Home),
                    ]}
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
    matchupContainerReversed: {
        flexDirection: 'row-reverse',
    },
    textStyle: {
        fontSize: 10,
    },
    bold: {
        fontWeight: 'bold',
    },
    teamNameStyle: {
        marginRight: 4,
    },
    matchWon: {
        backgroundColor: '#D9EDD4',
    },
    matchLost: {
        backgroundColor: '#F4D4CD',
    },
});
