import React from 'react';
import { StyleSheet } from 'react-native';
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

export const TeamHeader = ({
    team,
    teamNumber,
    gtmResults,
    selectedLeague,
    setSelectedTeam,
    setIsOverlayVisible,
}: Props) => (
    <ListItem
        key={team.teamId}
        style={styles.container}
        containerStyle={styles.containerStyle}
        contentContainerStyle={styles.contentContainerStyle}
        titleStyle={styles.titleStyle}
        subtitleStyle={styles.subtitleStyle}
        title={
            team.nickname ||
            selectedLeague.members.find(
                (member) => member.memberId === team.ownerIds[0]
            )?.displayName
        }
        subtitle={`Record: ${team.wins}-${team.losses}-${team.ties} | GTR: ${gtmResults.wins}-${gtmResults.losses}-${gtmResults.ties}`}
        bottomDivider
        rightIcon={{
            name: 'chevron-down',
            type: 'material-community',
            size: 16,
        }}
        onPress={() => {
            setIsOverlayVisible(true);
            setSelectedTeam(teamNumber);
        }}
    />
);

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    containerStyle: {
        padding: 0,
        minHeight: 64,
        maxHeight: 64,
    },
    contentContainerStyle: {
        alignItems: 'center',
    },
    titleStyle: {
        fontSize: 12,
        fontWeight: 'bold',
    },
    subtitleStyle: {
        fontSize: 8,
    },
});
