import React from 'react';
import { View, StyleSheet } from 'react-native';

import { TeamInfoMap } from './GarbageTimeMatchupsList';
import { SleeperLeagueMatchup } from '../../leagues/store/storeTypes';
import { MatchWinner, TeamDestination } from '../types';

import { GarbageTimeMatchupCardItem } from './GarbageTimeMatchupCardItem';

type Props = {
    matchupForTeam: number;
    teamInfoMap: TeamInfoMap;
    match: SleeperLeagueMatchup;
};

export const GarbageTimeMatchupCard = ({
    matchupForTeam,
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
            {/* AWAY TEAM */}
            <GarbageTimeMatchupCardItem
                matchupForTeam={matchupForTeam}
                teamDestination={TeamDestination.Away}
                match={match}
                teamInfoMap={teamInfoMap}
            />

            {/* HOME TEAM */}
            <GarbageTimeMatchupCardItem
                matchupForTeam={matchupForTeam}
                teamDestination={TeamDestination.Home}
                match={match}
                teamInfoMap={teamInfoMap}
            />
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
    matchWon: {
        backgroundColor: '#D9EDD4',
    },
    matchLost: {
        backgroundColor: '#F4D4CD',
    },
});
