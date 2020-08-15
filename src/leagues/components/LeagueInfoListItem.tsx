import React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';
import { Button, Avatar } from 'react-native-elements';

type Props = {
    leagueName: string;
    seasonId: string;
    totalTeams: string | number;
    leagueAvatar: string;
    isLoading?: boolean;
    icon?: string;
    onItemPressCallback?: () => void;
    onButtonPressCallback?: () => void;
};

export const LeagueInfoListItem = ({
    leagueName,
    seasonId,
    totalTeams,
    icon,
    leagueAvatar,
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
                    containerStyle={{ marginRight: 4 }}
                    rounded={leagueAvatar?.length > 0}
                    source={{
                        uri: avatarUrl,
                    }}
                />
                <View>
                    <Text>{leagueName}</Text>
                    <Text style={styles.subText}>{`Season: ${seasonId}`}</Text>
                    <Text style={styles.subText}>{`Teams: ${totalTeams}`}</Text>
                </View>
            </TouchableOpacity>

            {icon && onButtonPressCallback && (
                <Button
                    type='clear'
                    onPress={onButtonPressCallback}
                    buttonStyle={styles.button}
                    disabled={isLoading}
                    icon={{
                        name: icon,
                        type: 'material-community',
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
        borderBottomColor: '#eee',
    },
    subText: { fontSize: 10, color: '#adadad' },
    button: { padding: 0 },
    teamInfoContainer: {
        flexDirection: 'row',
        flex: 1,
        alignItems: 'center',
    },
});
