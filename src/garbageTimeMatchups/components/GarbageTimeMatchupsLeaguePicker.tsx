import React, { SetStateAction } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';

import { OverlayTypes } from '../types';
import { SleeperLeague, UserLeagues } from '../../leagues/store/storeTypes';
import { Color } from '../../common/styles/colors';

type Props = {
    selectedLeague: SleeperLeague;
    userLeagues: UserLeagues;
    setOverlay: React.Dispatch<SetStateAction<OverlayTypes>>;
};

export const GarbageTimeMatchupsLeaguePicker = ({
    selectedLeague,
    userLeagues,
    setOverlay,
}: Props) => {
    const league = userLeagues.sleeper.find(
        (userLeague) => userLeague.leagueId === selectedLeague.leagueId
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

            <Text style={{ fontWeight: 'bold' }} allowFontScaling={false}>
                {league?.leagueName}
            </Text>

            <Text style={styles.seasonId} allowFontScaling={false}>
                ({league?.seasonId})
            </Text>

            <Icon name="menu-down" type="material-community" />
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingBottom: 8,
    },
    seasonId: {
        fontSize: 12,
        marginLeft: 8,
        color: Color.SubTextGray,
        fontWeight: 'bold',
    },
    avatarContainer: { marginRight: 8 },
});
