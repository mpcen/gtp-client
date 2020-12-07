import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';

import * as Constants from '../constants';
import { ESPNLeague, League, SleeperLeague } from '../store/storeTypes';

import { Color } from '../../common/styles/colors';
import { LeaguePlatform } from '../types';
import { SleeperLeagueInfoListItem } from './sleeper/SleeperLeagueInfoListItem';
import { ESPNLeagueInfoListItem } from './espn/ESPNLeagueInfoListItem';
import { OverlayTypes } from '../../garbageTimeMatchups/types';

type Props = {
    leaguePlatform: LeaguePlatform;
    leagues: SleeperLeague[] | ESPNLeague[];
    isLoading: boolean;
    setOverlay: React.Dispatch<React.SetStateAction<OverlayTypes>>;
    setSelectedLeague: React.Dispatch<
        React.SetStateAction<SleeperLeague | ESPNLeague>
    >;
};

export const LeagueModule = ({
    leaguePlatform,
    leagues,
    isLoading,
    setOverlay,
    setSelectedLeague,
}: Props) => {
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
                renderItem={({ item }) =>
                    leaguePlatform === LeaguePlatform.Sleeper ? (
                        <SleeperLeagueInfoListItem
                            leagueName={item.leagueName}
                            seasonId={item.seasonId}
                            totalTeams={item.teams.length}
                            leagueAvatar={item.avatar || ''}
                            itemAdded={true}
                            isLoading={isLoading}
                            onButtonPressCallback={() => {
                                setSelectedLeague(item as SleeperLeague);
                                setOverlay(OverlayTypes.None);
                            }}
                        />
                    ) : (
                        <ESPNLeagueInfoListItem
                            leagueName={item.leagueName}
                            seasonId={item.seasonId}
                            totalTeams={item.teams.length}
                            itemAdded={true}
                            isLoading={isLoading}
                            onButtonPressCallback={() => {
                                setSelectedLeague(item as ESPNLeague);
                                setOverlay(OverlayTypes.None);
                            }}
                        />
                    )
                }
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
