import React, { SetStateAction } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import { OverlayTypes } from '../../types';
import {
    SleeperLeague,
    SleeperLeagueTeam,
} from '../../../leagues/store/storeTypes';
import { MemberMap } from '../../hooks/useMemberMap';
import { Color } from '../../../common/styles/colors';

type Props = {
    league: SleeperLeague;
    team: SleeperLeagueTeam;
    memberMap: MemberMap;
    setOverlay: React.Dispatch<SetStateAction<OverlayTypes>>;
};

export const GarbageTimeMatchupsTeamPicker = ({
    league,
    team,
    memberMap,
    setOverlay,
}: Props) => {
    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                setOverlay(OverlayTypes.TeamSelect);
            }}
        >
            <Avatar
                containerStyle={styles.avatarContainer}
                size="medium"
                rounded
                source={{
                    uri: `https://sleepercdn.com/avatars/thumbs/${
                        memberMap[team.ownerIds[0]]?.avatar
                    }`,
                }}
            />

            <View>
                <View style={[styles.row, styles.teamHeaderContainer]}>
                    {/* TEAM NAME */}
                    <Text style={styles.teamNameText} allowFontScaling={false}>
                        {team.nickname ||
                            league.members.find(
                                (member) => member.memberId === team.ownerIds[0]
                            )?.displayName}
                    </Text>

                    {/* RECORD */}
                    <Text style={styles.record} allowFontScaling={false}>
                        ({team.wins}-{team.losses}-{team.ties})
                    </Text>
                </View>

                <View style={[styles.row, { marginTop: 2 }]}>
                    {/* PF */}
                    <View style={styles.pointsContainer}>
                        <View style={styles.pointsAvatarContainer}>
                            <Text
                                style={styles.pointsTitle}
                                allowFontScaling={false}
                            >
                                PF
                            </Text>
                        </View>

                        <Text
                            style={styles.pointsText}
                            allowFontScaling={false}
                        >
                            {team.totalPointsFor['$numberDecimal']}
                        </Text>
                    </View>

                    {/* PA */}
                    <View style={[styles.pointsContainer, { marginLeft: 16 }]}>
                        <View style={styles.pointsAvatarContainer}>
                            <Text
                                style={styles.pointsTitle}
                                allowFontScaling={false}
                            >
                                PA
                            </Text>
                        </View>

                        <Text
                            style={styles.pointsText}
                            allowFontScaling={false}
                        >
                            {team.totalPointsAgainst['$numberDecimal']}
                        </Text>
                    </View>
                </View>
            </View>

            <View style={styles.dropdownIconContainer}>
                <Icon name="menu-down" type="material-community" />
            </View>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        height: 80,
        paddingTop: 4,
        paddingBottom: 4,
        alignItems: 'center',
    },
    teamHeaderContainer: {
        alignItems: 'center',
        marginBottom: 2,
    },
    teamNameText: {
        fontSize: 16,
        fontWeight: 'bold',
        color: Color.MainBlack,
    },
    row: { flexDirection: 'row' },
    avatarContainer: { marginRight: 8 },
    record: {
        fontSize: 12,
        marginLeft: 8,
        color: Color.SubTextGray,
        fontWeight: 'bold',
    },
    pointsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pointsAvatarContainer: {
        backgroundColor: Color.PointsGray,
        borderRadius: 20,
        width: 24,
        height: 24,
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 4,
    },
    pointsTitle: {
        color: Color.PureWhite,
        fontWeight: 'bold',
        fontSize: 12,
    },
    pointsText: { fontSize: 12, fontWeight: 'bold', color: Color.MainBlack },
    dropdownIconContainer: { marginLeft: 8 },
});
