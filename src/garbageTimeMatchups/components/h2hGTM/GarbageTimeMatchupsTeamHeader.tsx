import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import { OverlayTypes } from '../../types';
import { SleeperMemberMap } from '../../hooks/sleeper/useSleeperMemberMap';
import { GTMResult } from '../../hooks/sleeper/useSleeperGarbageTimeMatchups';
import {
    SleeperLeagueTeam,
    SleeperLeague,
} from '../../../leagues/store/storeTypes';
import { Color } from '../../../common/styles/colors';

type Props = {
    team: SleeperLeagueTeam;
    teamNumber: number;
    memberMap: SleeperMemberMap;
    gtmResults: GTMResult;
    selectedLeague: SleeperLeague;
    setSelectedTeam: React.Dispatch<React.SetStateAction<number>>;
    setOverlay: React.Dispatch<React.SetStateAction<OverlayTypes>>;
};

const renderGTR = (gtmResults: GTMResult) => {
    return `${gtmResults.wins}-${gtmResults.losses}-${gtmResults.ties}`;
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
                    size="small"
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
                    {/* TEAM NAME */}
                    <Text
                        style={[
                            styles.textStyle,
                            styles.bold,
                            styles.teamNameText,
                            teamNumber === 2
                                ? styles.textAlignmentReversed
                                : null,
                        ]}
                        allowFontScaling={false}
                    >
                        {team.nickname ||
                            selectedLeague.members.find(
                                (member) => member.memberId === team.ownerIds[0]
                            )?.displayName}
                    </Text>

                    {/* CHEVRON DOWN ICON */}
                    <Icon
                        name="menu-down"
                        type="material-community"
                        size={16}
                    />
                </TouchableOpacity>

                {/* RECORD */}
                <Text
                    style={[styles.textStyle, styles.teamRecordInfo]}
                    allowFontScaling={false}
                >
                    {team.wins}-{team.losses}-{team.ties}
                </Text>

                {/* PF */}
                <Text
                    style={[styles.textStyle, styles.teamRecordInfo]}
                    allowFontScaling={false}
                >
                    PF: {team.totalPointsFor['$numberDecimal']}
                </Text>

                {/* PA */}
                <Text
                    style={[styles.textStyle, styles.teamRecordInfo]}
                    allowFontScaling={false}
                >
                    PA: {team.totalPointsAgainst['$numberDecimal']}
                </Text>

                {/* GTR */}
                <TouchableOpacity
                    style={styles.gtrContainer}
                    onPress={() => setOverlay(OverlayTypes.GTRInfo)}
                >
                    <Icon
                        containerStyle={styles.gtrIconInformationStyle}
                        name="information-outline"
                        type="material-community"
                        color={Color.ActiveBlue}
                        size={10}
                    />
                    <Text
                        style={[
                            styles.textStyle,
                            styles.teamRecordInfo,
                            styles.gtrStyle,
                        ]}
                        allowFontScaling={false}
                    >
                        GTR: {renderGTR(gtmResults)}
                    </Text>
                </TouchableOpacity>
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
    textAlignmentReversed: {
        textAlign: 'right',
    },
    teamNameText: { fontSize: 14 },
    textStyle: {
        fontSize: 12,
        color: Color.MainBlack,
    },
    bold: {
        fontWeight: 'bold',
    },
    gtrContainer: { flexDirection: 'row', alignItems: 'center', marginTop: 12 },
    gtrIconInformationStyle: { marginRight: 4 },
    teamNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: 150,
    },
    teamNameContainerReversed: { flexDirection: 'row-reverse' },
    teamRecordInfo: {
        fontSize: 10,
        fontWeight: 'bold',
    },
    teamRecordInfoReversed: {
        alignItems: 'flex-end',
    },
    gtrStyle: {
        fontWeight: 'bold',
    },
});
