import React, { SetStateAction } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Avatar, Icon } from 'react-native-elements';
import { Asset } from 'expo-asset';

import { OverlayTypes } from '../types';
import { ESPNLeague, SleeperLeague } from '../../leagues/store/storeTypes';
import { Color } from '../../common/styles/colors';
import { LeaguePlatform } from '../../leagues/types';

type Props = {
    leaguePlatform: LeaguePlatform;
    selectedSleeperLeague: SleeperLeague;
    selectedESPNLeague: ESPNLeague;
    setOverlay: React.Dispatch<SetStateAction<OverlayTypes>>;
};

export const GarbageTimeMatchupsLeaguePicker = ({
    leaguePlatform,
    selectedSleeperLeague,
    selectedESPNLeague,
    setOverlay,
}: Props) => {
    let avatarUrl: string = '';

    if (leaguePlatform === LeaguePlatform.Sleeper) {
        avatarUrl = selectedSleeperLeague?.avatar
            ? `https://sleepercdn.com/avatars/thumbs/${selectedSleeperLeague.avatar}`
            : 'https://sleepercdn.com/images/v2/icons/league/league_avatar_mint.png';
    } else if (leaguePlatform === LeaguePlatform.ESPN) {
        avatarUrl = Asset.fromModule(
            require('../../../assets/espn-ff-thumb.png')
        ).uri;
    }

    return (
        <TouchableOpacity
            style={styles.container}
            onPress={() => {
                setOverlay(OverlayTypes.LeagueSelect);
            }}
        >
            <Avatar
                containerStyle={styles.avatarContainer}
                rounded={
                    (leaguePlatform === LeaguePlatform.Sleeper &&
                        selectedSleeperLeague?.avatar?.length! > 0) ||
                    true
                }
                source={{
                    uri: avatarUrl,
                }}
            />

            <Text style={styles.leagueName} allowFontScaling={false}>
                {leaguePlatform === LeaguePlatform.Sleeper
                    ? selectedSleeperLeague?.leagueName
                    : selectedESPNLeague.leagueName}
            </Text>

            <Text style={styles.seasonId} allowFontScaling={false}>
                (
                {leaguePlatform === LeaguePlatform.Sleeper
                    ? selectedSleeperLeague?.seasonId
                    : selectedESPNLeague.seasonId}
                )
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
    leagueName: { fontWeight: 'bold' },
    seasonId: {
        fontSize: 12,
        marginLeft: 8,
        color: Color.SubTextGray,
        fontWeight: 'bold',
    },
    avatarContainer: { marginRight: 8 },
});
