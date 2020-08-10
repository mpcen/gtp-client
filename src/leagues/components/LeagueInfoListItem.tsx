import React, { SetStateAction } from 'react';
import { Text, View, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';

type Props = {
    leagueName: string;
    seasonId: string;
    totalTeams: string | number;
    icon: string;
    onPressCallback: () => void;
};

export const LeagueInfoListItem = ({
    leagueName,
    seasonId,
    totalTeams,
    icon,
    onPressCallback,
}: Props) => {
    return (
        <View style={styles.itemContainer}>
            <View>
                <Text>{leagueName}</Text>
                <Text style={styles.subText}>{`Season: ${seasonId}`}</Text>
                <Text style={styles.subText}>{`Teams: ${totalTeams}`}</Text>
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
});
