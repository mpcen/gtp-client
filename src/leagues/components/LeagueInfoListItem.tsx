import React from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button, Avatar } from 'react-native-elements';

type Props = {
    leagueName: string;
    seasonId: string;
    totalTeams: string | number;
    icon: string;
    leagueAvatar: string;
    onPressCallback: () => void;
};

export const LeagueInfoListItem = ({
    leagueName,
    seasonId,
    totalTeams,
    icon,
    leagueAvatar,
    onPressCallback,
}: Props) => {
    const avatarUrl = leagueAvatar
        ? `https://sleepercdn.com/avatars/thumbs/${leagueAvatar}`
        : 'https://sleepercdn.com/images/v2/icons/league/league_avatar_mint.png';

    return (
        <View style={styles.itemContainer}>
            <View style={styles.teamInfoContainer}>
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
            </View>

            <Button
                onPress={onPressCallback}
                buttonStyle={styles.button}
                type='clear'
                icon={{
                    name: icon,
                    type: 'material-community',
                }}
            />
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
        alignItems: 'center',
    },
});
