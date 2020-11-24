import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Avatar } from 'react-native-elements';

import { Color } from '../../../common/styles/colors';

type Props = {
    leagueName: string;
    seasonId: string;
    totalTeams: number;
    itemAdded: boolean | undefined;
    isLoading: boolean;
    leagueAvatar: string;
    onItemPressCallback?: () => void;
    onButtonPressCallback?: () => void;
};

export const SleeperLeagueInfoListItem = ({
    leagueName,
    seasonId,
    totalTeams,
    leagueAvatar,
    itemAdded,
    isLoading,
    onItemPressCallback,
    onButtonPressCallback,
}: Props) => {
    const avatarUrl = leagueAvatar
        ? `https://sleepercdn.com/avatars/thumbs/${leagueAvatar}`
        : 'https://sleepercdn.com/images/v2/icons/league/league_avatar_mint.png';

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.teamInfoContainer}
                disabled={onItemPressCallback === undefined}
                onPress={onItemPressCallback}
            >
                <Avatar
                    containerStyle={styles.avatarContainerStyle}
                    rounded={leagueAvatar!.length > 0}
                    source={{ uri: avatarUrl }}
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
    avatarContainerStyle: { marginRight: 4 },
});
