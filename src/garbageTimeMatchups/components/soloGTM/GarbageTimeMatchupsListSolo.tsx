import React from 'react';
import {
    Text,
    FlatList,
    StyleSheet,
    TouchableOpacity,
    View,
} from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import { SoloGTMResult } from '../../hooks/sleeper/useSleeperGarbageTimeMatchups';
import { SleeperMemberMap } from '../../hooks/sleeper/useSleeperMemberMap';
import { OverlayTypes } from '../../types';

import { Color } from '../../../common/styles/colors';
import {
    SleeperLeague,
    SleeperLeagueTeam,
} from '../../../leagues/store/storeTypes';

type Props = {
    soloTeam: SleeperLeagueTeam;
    memberMap: SleeperMemberMap;
    soloGTMResults: SoloGTMResult[];
    league: SleeperLeague;
    setOverlay: React.Dispatch<React.SetStateAction<OverlayTypes>>;
};

export const GarbageTimeMatchupsListSolo = ({
    soloTeam,
    memberMap,
    soloGTMResults,
    league,
    setOverlay,
}: Props) => {
    const isGTRBetter = (
        team: SleeperLeagueTeam,
        gtrResults: SoloGTMResult
    ): boolean => {
        const actualPoints = team.wins + team.ties * 0.5;
        const gtrPoints = gtrResults.wins + gtrResults.ties * 0.5;

        if (gtrPoints > actualPoints) {
            return true;
        }

        return false;
    };

    return (
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={soloGTMResults}
            renderItem={({ item }: { item: SoloGTMResult }) => {
                return (
                    <View
                        style={[
                            styles.container,
                            isGTRBetter(soloTeam, item)
                                ? styles.betterRecord
                                : null,
                        ]}
                    >
                        <View style={styles.upperContainer}>
                            {/* AVATAR */}
                            <Avatar
                                containerStyle={styles.avatarContainer}
                                rounded
                                source={{
                                    uri: `https://sleepercdn.com/avatars/thumbs/${
                                        memberMap[item.opponent.ownerIds[0]]
                                            ?.avatar
                                    }`,
                                }}
                            />

                            {/* TEAM NAME */}
                            <View>
                                <Text
                                    style={styles.teamNameText}
                                    allowFontScaling={false}
                                >
                                    {item.opponent.nickname ||
                                        league.members.find(
                                            (member) =>
                                                member.memberId ===
                                                item.opponent.ownerIds[0]
                                        )?.displayName}
                                </Text>

                                {/* RECORD */}
                                <Text
                                    style={styles.recordText}
                                    allowFontScaling={false}
                                >{`${item.opponent.wins}-${item.opponent.losses}-${item.opponent.ties}`}</Text>
                            </View>
                        </View>

                        {/* GTR */}
                        <View>
                            <TouchableOpacity
                                style={styles.gtrButtonContainer}
                                onPress={() => setOverlay(OverlayTypes.GTRInfo)}
                            >
                                <Icon
                                    containerStyle={
                                        styles.gtrIconInformationStyle
                                    }
                                    name="information-outline"
                                    type="material-community"
                                    color={Color.ActiveBlue}
                                    size={10}
                                />
                                <Text
                                    style={styles.gtrText}
                                    allowFontScaling={false}
                                >
                                    GTR:{' '}
                                    {`${item.wins}-${item.losses}-${item.ties}`}
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                );
            }}
        />
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 4,
        marginBottom: 4,
        marginLeft: 16,
        marginRight: 16,
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 8,
        paddingRight: 8,
        borderRadius: 4,
        borderWidth: 0.333,
        borderColor: Color.LightGray,
    },
    upperContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gtrIconInformationStyle: { marginRight: 4 },
    avatarContainer: {
        width: 32,
        height: 32,
        marginRight: 10,
    },
    teamNameText: {
        fontSize: 12,
        fontWeight: 'bold',
        color: Color.MainBlack,
    },
    recordText: {
        fontSize: 10,
        fontWeight: 'bold',
        color: Color.SubTextGray,
    },
    gtrButtonContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gtrText: {
        fontWeight: 'bold',
        color: Color.MainBlack,
        fontSize: 12,
    },
    betterRecord: {
        backgroundColor: Color.GTMWin,
    },
});
