import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    FlatList,
    Image,
    Platform,
} from 'react-native';
import { Divider, ListItem, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { Asset } from 'expo-asset';

import { SleeperLeague } from '../store/storeTypes';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { LeaguePlatform } from '../types';

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
                    title='Add League'
                    onPress={() => navigate('ImportSleeperLeagues')}
                />
            </View>

            <Divider />

            <FlatList
                data={leagues}
                keyExtractor={(item) => item.leagueId}
                renderItem={({ item }) => (
                    <View style={styles.itemContainer} key={item.leagueId}>
                        <View>
                            <Text>{item.leagueName}</Text>
                            <Text
                                style={styles.subText}
                            >{`Season: ${item.seasonId}`}</Text>
                            <Text
                                style={styles.subText}
                            >{`Teams: ${item.teams.length}`}</Text>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                setSelectedLeague(item);
                                setIsOverlayVisible(true);
                            }}
                        >
                            <Button
                                buttonStyle={styles.button}
                                type='clear'
                                icon={{
                                    name: 'minus',
                                    type: 'material-community',
                                }}
                            />
                        </TouchableOpacity>
                    </View>
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
        backgroundColor: '#2E3336',
    },
    headerText: { fontSize: 18 },
    button: {
        padding: 0,
    },
    itemContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        borderBottomWidth: 0.5,
        borderBottomColor: '#eee',
    },
    subText: {
        fontSize: 10,
        color: '#999',
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
