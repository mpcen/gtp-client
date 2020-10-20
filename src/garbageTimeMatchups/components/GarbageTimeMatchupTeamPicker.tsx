import React, { SetStateAction } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import { OverlayTypes } from '../types';
import {
    SleeperLeague,
    SleeperLeagueTeam,
} from '../../leagues/store/storeTypes';
import { MemberMap } from '../hooks/useMemberMap';

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
                rounded
                source={{
                    uri: `https://sleepercdn.com/avatars/thumbs/${
                        memberMap[team.ownerIds[0]]?.avatar
                    }`,
                }}
            />

            <Text allowFontScaling={false}>
                {team.nickname ||
                    league.members.find(
                        (member) => member.memberId === team.ownerIds[0]
                    )?.displayName}
            </Text>

            <Icon name="menu-down" type="material-community" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        height: 60,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    avatarContainer: { marginRight: 8 },
});
