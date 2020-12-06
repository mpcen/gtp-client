import React, { SetStateAction } from 'react';
import { Text, TouchableOpacity, StyleSheet, View } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import { OverlayTypes } from '../../types';
import { Color } from '../../../common/styles/colors';

type Props = {
    teamName: string;
    teamRecord: { wins: number; losses: number; ties: number };
    totalPointsFor: string;
    totalPointsAgainst: string;
    avatarUrl: string;
    setOverlay: React.Dispatch<SetStateAction<OverlayTypes>>;
};

export const GarbageTimeMatchupsTeamPicker = ({
    teamName,
    teamRecord,
    totalPointsFor,
    totalPointsAgainst,
    avatarUrl,
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
                source={{ uri: avatarUrl }}
            />

            <View>
                <View style={[styles.row, styles.teamHeaderContainer]}>
                    {/* TEAM NAME */}
                    <Text style={styles.teamNameText} allowFontScaling={false}>
                        {teamName}
                    </Text>

                    {/* RECORD */}
                    <Text style={styles.record} allowFontScaling={false}>
                        ({teamRecord.wins}-{teamRecord.losses}-{teamRecord.ties}
                        )
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
                            {totalPointsFor}
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
                            {totalPointsAgainst}
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
