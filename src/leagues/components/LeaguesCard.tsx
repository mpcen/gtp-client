import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Divider, ListItem, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { SleeperLeague } from '../store/storeTypes';

type Props = {
    platform: string;
    leagues: SleeperLeague[];
    setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedLeague: React.Dispatch<React.SetStateAction<SleeperLeague>>;
};

export const LeaguesCard = ({
    platform,
    leagues,
    setIsOverlayVisible,
    setSelectedLeague,
}: Props) => {
    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.headerText}>{platform} Leagues</Text>
                <Button
                    buttonStyle={styles.headerButton}
                    type='clear'
                    icon={{ name: 'plus', type: 'material-community' }}
                    onPress={() => navigate('ImportSleeperLeagues')}
                />
            </View>

            <Divider />

            <FlatList
                data={leagues}
                keyExtractor={(item) => item.leagueId}
                renderItem={({ item }) => (
                    <ListItem
                        key={item.leagueId}
                        title={item.leagueName}
                        subtitle={`Season: ${item.seasonId} Teams: ${item.teams.length}`}
                        rightIcon={{
                            name: 'minus',
                            type: 'material-community',
                        }}
                        onPress={() => {
                            setSelectedLeague(item);
                            setIsOverlayVisible(true);
                        }}
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
    },
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: 14,
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 20,
    },
    headerText: { fontSize: 18 },
    headerButton: {
        padding: 0,
    },
});
