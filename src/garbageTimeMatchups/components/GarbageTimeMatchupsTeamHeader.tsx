import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import { ListItem } from 'react-native-elements';

import {
    SleeperLeagueTeam,
    SleeperLeague,
} from '../../leagues/store/storeTypes';
import { GTMResult } from '../useGarbageTimeMatchups';

type Props = {
    team: SleeperLeagueTeam;
    teamNumber: number;
    gtmResults: GTMResult;
    selectedLeague: SleeperLeague;
    setSelectedTeam: React.Dispatch<React.SetStateAction<number>>;
    setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const maybeReverseContainerDirection = (teamNumber: number) => {
    return teamNumber === 2 ? styles.containerReversed : null;
};

export const GarbageTimeMatchupsTeamHeader = ({
    team,
    teamNumber,
    gtmResults,
    selectedLeague,
    setSelectedTeam,
    setIsOverlayVisible,
}: Props) => {
    return (
        <TouchableOpacity
            style={[
                styles.container,
                maybeReverseContainerDirection(teamNumber),
            ]}
            onPress={() => {
                setIsOverlayVisible(true);
                setSelectedTeam(teamNumber);
            }}
        >
            <Text style={[styles.textStyle, styles.bold]}>
                {team.nickname ||
                    selectedLeague.members.find(
                        (member) => member.memberId === team.ownerIds[0]
                    )?.displayName}
            </Text>

            <Text style={[styles.textStyle, styles.teamRecordInfo]}>
                Record: {team.wins}-{team.losses}-{team.ties}
            </Text>
            <Text style={[styles.textStyle, styles.teamRecordInfo]}>
                GTR: {gtmResults.wins}-{gtmResults.losses}-{gtmResults.ties}
            </Text>
            <Text style={[styles.textStyle, styles.teamRecordInfo]}>
                PF: {team.totalPointsFor['$numberDecimal']}
            </Text>
            <Text style={[styles.textStyle, styles.teamRecordInfo]}>
                PA: {team.totalPointsAgainst['$numberDecimal']}
            </Text>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    containerReversed: {
        alignItems: 'flex-end',
    },
    textStyle: {
        fontSize: 12,
    },
    bold: {
        fontWeight: 'bold',
    },
    teamRecordInfo: {
        fontSize: 10,
    },
});
