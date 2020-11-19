import { Asset } from 'expo-asset';
import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { Color } from '../../common/styles/colors';
import { ESPNLeague, SleeperLeague } from '../store/storeTypes';
import { LeaguePlatform } from '../types';

type Props = {
    league: SleeperLeague | ESPNLeague;
    itemAdded?: boolean;
    isLoading?: boolean;
    icon?: string;
    onItemPressCallback?: () => void;
    onButtonPressCallback?: () => void;
};

const espnAvatarUrl = Asset.fromModule(
    require('../../../assets/espn-ff-thumb.png')
).uri;

export const LeagueInfoListItem = ({
    league,
    itemAdded,
    isLoading,
    onItemPressCallback,
    onButtonPressCallback,
}: Props) => {
    const sleeperAvatarUrl: string =
        leaguePlatform === LeaguePlatform.Sleeper && sleeperLeagueAvatar
            ? `https://sleepercdn.com/avatars/thumbs/${sleeperLeagueAvatar}`
            : 'https://sleepercdn.com/images/v2/icons/league/league_avatar_mint.png';

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.teamInfoContainer}
                disabled={onItemPressCallback === undefined}
                onPress={onItemPressCallback}
            >
                <Avatar
                    containerStyle={{ marginRight: 4 }}
                    rounded={
                        leaguePlatform === LeaguePlatform.Sleeper
                            ? sleeperLeagueAvatar!.length > 0
                            : true
                    }
                    source={{
                        uri:
                            leaguePlatform === LeaguePlatform.Sleeper
                                ? sleeperAvatarUrl
                                : espnAvatarUrl,
                    }}
                />
                <View>
                    <Text>{leagueName}</Text>
                    <Text style={styles.subText}>{`Season: ${seasonId}`}</Text>
                    <Text style={styles.subText}>{`Teams: ${totalTeams}`}</Text>
                </View>
            </TouchableOpacity>

            {itemAdded !== undefined && onButtonPressCallback && (
                <Button
                    type="clear"
                    onPress={onButtonPressCallback}
                    buttonStyle={styles.button}
                    disabled={isLoading}
                    icon={{
                        name: itemAdded ? 'minus-circle' : 'plus-circle',
                        type: 'material-community',
                        color: itemAdded
                            ? Color.RemoveLeagueRed
                            : Color.AddLeagueGreen,
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: Color.LightBorderGray,
    },
    subText: { fontSize: 10, color: Color.SubTextGray },
    button: { padding: 0 },
    teamInfoContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
});
