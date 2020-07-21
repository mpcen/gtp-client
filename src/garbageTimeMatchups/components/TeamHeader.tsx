import React from 'react';
import { StyleSheet } from 'react-native';
import { ListItem } from 'react-native-elements';

import {
    SleeperLeagueTeam,
    SleeperLeague,
} from '../../leagues/store/storeTypes';

type Props = {
    team: SleeperLeagueTeam;
    teamNumber: number;
    selectedLeague: SleeperLeague;
    setSelectedTeam: React.Dispatch<React.SetStateAction<number>>;
    setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TeamHeader = ({
    team,
    teamNumber,
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
        title={
            team.nickname ||
            selectedLeague.members.find(
                (member) => member.memberId === team.ownerIds[0]
            )?.displayName
        }
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
});
