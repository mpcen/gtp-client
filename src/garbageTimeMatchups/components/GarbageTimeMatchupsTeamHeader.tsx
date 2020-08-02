import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import { OverlayTypes } from '../types';
import { MemberMap } from '../hooks/useMemberMap';
import { GTMResult } from '../hooks/useGarbageTimeMatchups';
import {
    SleeperLeagueTeam,
    SleeperLeague,
} from '../../leagues/store/storeTypes';

type Props = {
    team: SleeperLeagueTeam;
    teamNumber: number;
    memberMap: MemberMap;
    gtmResults: GTMResult;
    selectedLeague: SleeperLeague;
    setSelectedTeam: React.Dispatch<React.SetStateAction<number>>;
    setOverlay: React.Dispatch<React.SetStateAction<OverlayTypes>>;
};

export const GarbageTimeMatchupsTeamHeader = ({
    team,
    teamNumber,
    memberMap,
    gtmResults,
    selectedLeague,
    setSelectedTeam,
    setOverlay,
}: Props) => {
    return (
        <View
            style={[
                styles.container,
                teamNumber === 2 ? styles.containerReversed : null,
            ]}
        >
            <View
                style={[
                    styles.headerContainer,
                    teamNumber === 2 ? styles.headerContainerReversed : null,
                ]}
            >
                <Avatar
                    rounded
                    size='small'
                    source={{
                        uri: `https://sleepercdn.com/avatars/thumbs/${
                            memberMap[team.ownerIds[0]]?.avatar
                        }`,
                    }}
                />
            </View>

            <View
                style={teamNumber === 2 ? styles.teamRecordInfoReversed : null}
            >
                <TouchableOpacity
                    style={[
                        styles.teamNameContainer,
                        teamNumber === 2
                            ? styles.teamNameContainerReversed
                            : null,
                    ]}
                    onPress={() => {
                        setOverlay(OverlayTypes.TeamSelect);
                        setSelectedTeam(teamNumber);
                    }}
                >
                    <Text style={[styles.textStyle, styles.bold]}>
                        {team.nickname ||
                            selectedLeague.members.find(
                                (member) => member.memberId === team.ownerIds[0]
                            )?.displayName}
                    </Text>

                    <Icon
                        name='menu-down'
                        type='material-community'
                        size={16}
                    />
                </TouchableOpacity>

                <Text style={[styles.textStyle, styles.teamRecordInfo]}>
                    Record: {team.wins}-{team.losses}-{team.ties}
                </Text>

                <TouchableOpacity
                    style={styles.gtrContainer}
                    onPress={() => setOverlay(OverlayTypes.GTRInfo)}
                >
                    <Icon
                        containerStyle={styles.gtrIconInformationStyle}
                        name='information-outline'
                        type='material-community'
                        color='#279AF1'
                        size={10}
                    />
                    <Text style={[styles.textStyle, styles.teamRecordInfo]}>
                        GTR: {gtmResults.wins}-{gtmResults.losses}-
                        {gtmResults.ties}
                    </Text>
                </TouchableOpacity>

                <Text style={[styles.textStyle, styles.teamRecordInfo]}>
                    PF: {team.totalPointsFor['$numberDecimal']}
                </Text>

                <Text style={[styles.textStyle, styles.teamRecordInfo]}>
                    PA: {team.totalPointsAgainst['$numberDecimal']}
                </Text>
            </View>
        </View>
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
    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    headerContainerReversed: {
        flexDirection: 'row-reverse',
    },
    textStyle: {
        fontSize: 12,
    },
    bold: {
        fontWeight: 'bold',
    },
    gtrContainer: { flexDirection: 'row', alignItems: 'center' },
    gtrIconInformationStyle: { marginRight: 4 },
    teamNameContainer: { flexDirection: 'row', alignItems: 'center' },
    teamNameContainerReversed: { flexDirection: 'row-reverse' },
    teamRecordInfo: {
        fontSize: 10,
    },
    teamRecordInfoReversed: {
        alignItems: 'flex-end',
    },
});
