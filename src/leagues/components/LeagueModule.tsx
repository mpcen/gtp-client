import React from 'react';
import { View, Text, StyleSheet, FlatList, Image } from 'react-native';
import { Divider, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';

import { SleeperLeague } from '../store/storeTypes';
import { LeaguePlatform } from '../types';

import { LeagueInfoListItem } from './LeagueInfoListItem';

type Props = {
    platform: string;
    leagues: SleeperLeague[];
    setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedLeague: React.Dispatch<React.SetStateAction<SleeperLeague>>;
};

export const LeagueModule = ({
    platform,
    leagues,
    setIsOverlayVisible,
    setSelectedLeague,
}: Props) => {
    const { navigate } = useNavigation();

    const sleeperLogoUri = Asset.fromModule(
        require('../../../assets/sleeper-logo.png')
    ).uri;
    const espnLogoUri = Asset.fromModule(
        require('../../../assets/espn-logo.png')
    ).uri;

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Image
                    style={[
                        styles.leaguePlatformImageStyle,
                        platform === LeaguePlatform.Sleeper
                            ? styles.sleeperImageStyle
                            : styles.espnImageStyle,
                    ]}
                    source={{
                        uri:
                            platform === LeaguePlatform.Sleeper
                                ? sleeperLogoUri
                                : espnLogoUri,
                    }}
                />
                <Button
                    buttonStyle={styles.button}
                    type='clear'
                    icon={{
                        name: 'plus',
                        type: 'material-community',
                        color: 'white',
                    }}
                    onPress={() => navigate('ImportSleeperLeagues')}
                />
            </View>

            <Divider />

            <FlatList
                contentContainerStyle={styles.listContainer}
                data={leagues}
                keyExtractor={(item) => item.leagueId}
                renderItem={({ item }) => (
                    <LeagueInfoListItem
                        leagueName={item.leagueName}
                        seasonId={item.seasonId}
                        totalTeams={item.teams.length}
                        icon='minus'
                        leagueAvatar={item.avatar}
                        onPressCallback={() => {
                            setSelectedLeague(item);
                            setIsOverlayVisible(true);
                        }}
                    />
                )}
                ListEmptyComponent={() => (
                    <View style={styles.emptyLeaguesContainer}>
                        <Text style={styles.emptyLeaguesText}>
                            Add a league to get started
                        </Text>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
    },
    emptyLeaguesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white',
    },
    emptyLeaguesText: {
        color: '#adadad',
    },
    listContainer: { flex: 1 },
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 10,
        backgroundColor: '#2E3336',
    },
    button: {
        padding: 0,
    },
    leaguePlatformImageStyle: {
        width: 150,
        borderRadius: 50,
    },
    sleeperImageStyle: {
        height: 50,
    },
    espnImageStyle: {
        backgroundColor: '#DD0000',
        height: 50,
    },
});
