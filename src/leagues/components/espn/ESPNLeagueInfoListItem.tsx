import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Avatar } from 'react-native-elements';
import { Asset } from 'expo-asset';

import { Color } from '../../../common/styles/colors';

type Props = {
    leagueName: string;
    seasonId: string;
    totalTeams: number;
    itemAdded: boolean | undefined;
    isLoading: boolean;
    onItemPressCallback?: () => void;
    onButtonPressCallback?: () => void;
};

export const ESPNLeagueInfoListItem = ({
    leagueName,
    seasonId,
    totalTeams,
    itemAdded,
    isLoading,
    onItemPressCallback,
    onButtonPressCallback,
}: Props) => {
    const espnAvatarUrl = Asset.fromModule(
        require('../../../../assets/espn-ff-thumb.png')
    ).uri;

    return (
        <View style={styles.itemContainer}>
            <TouchableOpacity
                style={styles.teamInfoContainer}
                disabled={onItemPressCallback === undefined}
                onPress={onItemPressCallback}
            >
                <Avatar
                    containerStyle={styles.avatarContainerStyle}
                    rounded={true}
                    source={{ uri: espnAvatarUrl }}
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
