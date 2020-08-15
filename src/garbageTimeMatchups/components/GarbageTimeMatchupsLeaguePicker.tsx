import React, { SetStateAction } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import { OverlayTypes } from '../types';
import { UserLeagues } from '../../leagues/store/storeTypes';

type Props = {
    selectedLeagueId: string;
    userLeagues: UserLeagues;
    setOverlay: React.Dispatch<SetStateAction<OverlayTypes>>;
};

export const GarbageTimeMatchupsLeaguePicker = ({
    selectedLeagueId,
    userLeagues,
    setOverlay,
}: Props) => {
    const league = userLeagues.sleeper.find(
        (userLeague) => userLeague.leagueId === selectedLeagueId
    );

    const avatarUrl = league?.avatar
        ? `https://sleepercdn.com/avatars/thumbs/${league.avatar}`
        : 'https://sleepercdn.com/images/v2/icons/league/league_avatar_mint.png';

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                setOverlay(OverlayTypes.LeagueSelect);
            }}
        >
            <Avatar
                containerStyle={styles.avatarContainer}
                rounded={league?.avatar?.length! > 0}
                source={{
                    uri: avatarUrl,
                }}
            />

            <Text allowFontScaling={false}>{league?.leagueName}</Text>

            <Icon name='menu-down' type='material-community' />
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
