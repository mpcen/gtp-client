import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import * as Constants from '../constants';
import { ESPNLeague, League, SleeperLeague } from '../store/storeTypes';

import { LeagueInfoListItem } from './LeagueInfoListItem';
import { Color } from '../../common/styles/colors';
import { LeaguePlatform } from '../types';

type Props = {
    leaguePlatform: LeaguePlatform;
    leagues: SleeperLeague[] | ESPNLeague[];
    isLoading: boolean;
    setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
    setSelectedLeague: React.Dispatch<React.SetStateAction<SleeperLeague>>;
};

export const LeagueModule = ({
    leaguePlatform,
    leagues,
    isLoading,
    setIsOverlayVisible,
    setSelectedLeague,
}: Props) => {
    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <FlatList
                contentContainerStyle={
                    leagues.length ? null : styles.emptyLeaguesContainer
                }
                data={leagues as League[]}
                keyExtractor={(item: SleeperLeague | ESPNLeague) =>
                    item.leagueId
                }
                renderItem={({ item }) => (
                    <LeagueInfoListItem
                        league={item}
                        itemAdded={true}
                        icon="minus-circle"
                        onButtonPressCallback={() => {
                            setSelectedLeague(item);
                            setIsOverlayVisible(true);
                        }}
                    />
                )}
                ListEmptyComponent={() =>
                    isLoading ? (
                        <View style={styles.emptyLeaguesContainer}>
                            <Text>{Constants.LoadingText}</Text>
                        </View>
                    ) : (
                        <View style={styles.emptyLeaguesContainer}>
                            <Text style={styles.emptyLeaguesText}>
                                {Constants.AddLeagueText}
                            </Text>
                        </View>
                    )
                }
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        flex: 1,
        position: 'relative',
    },
    emptyLeaguesContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyLeaguesText: {
        fontSize: 18,
        color: Color.MainBlack,
        fontFamily: 'BebasNeue_400Regular',
    },
    headerContainer: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 20,
        paddingRight: 10,
        backgroundColor: Color.SleeperBackgroundColor,
    },
    button: {
        paddingLeft: 6,
        paddingRight: 6,
        paddingTop: 3,
        paddingBottom: 3,
        borderWidth: 1,
        borderColor: Color.PureWhite,
    },
    leaguePlatformImageStyle: {
        width: 150,
        borderRadius: 50,
    },
    sleeperImageStyle: {
        height: 50,
    },
    addLeagueButtonTitle: {
        color: Color.PureWhite,
        fontFamily: 'BebasNeue_400Regular',
    },
});
