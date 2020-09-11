import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    FlatList,
    ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Divider, Overlay, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import * as constants from './constants';
import { RootState } from '../store/rootReducer';
import { SleeperLeague, SleeperLeagueTeam } from '../leagues/store/storeTypes';
import { useMemberMap } from './hooks/useMemberMap';
import { useGarbageTimeMatchups } from './hooks/useGarbageTimeMatchups';
import { OverlayTypes } from './types';

import { GarbageTimeMatchupsTeamHeader } from './components/GarbageTimeMatchupsTeamHeader';
import { GarbageTimeTeamSelectList } from './components/GarbageTimeTeamSelectList';
import { GarbageTimeMatchupsList } from './components/GarbageTimeMatchupsList';
import { LeagueInfoListItem } from '../leagues/components/LeagueInfoListItem';
import { GarbageTimeMatchupsLeaguePicker } from './components/GarbageTimeMatchupsLeaguePicker';

export const GarbageTimeMatchupsScreen = () => {
    const { navigate } = useNavigation();
    const { userLeagues } = useSelector((state: RootState) => state.leagues);
    const [selectedLeagueId, setSelectedLeagueId] = useState('');
    const [selectedLeague, setSelectedLeague] = useState({} as SleeperLeague);
    const [team1, setTeam1] = useState({} as SleeperLeagueTeam);
    const [team2, setTeam2] = useState({} as SleeperLeagueTeam);
    const [selectedTeam, setSelectedTeam] = useState(0);
    const [overlay, setOverlay] = useState(OverlayTypes.None);
    const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);

    useEffect(() => {
        setIsInitiallyLoaded(true);
    }, []);

    useEffect(() => {
        if (userLeagues.sleeper.length) {
            const defaultSelectedLeague = userLeagues.sleeper[0];

            setSelectedLeagueId(defaultSelectedLeague.leagueId);
            setSelectedLeague(defaultSelectedLeague);
            setTeam1(defaultSelectedLeague.teams[0]);
            setTeam2(defaultSelectedLeague.teams[1]);
        } else if (!userLeagues.sleeper.length && selectedLeagueId) {
            setSelectedLeagueId('');
            setSelectedLeague({} as SleeperLeague);
            setTeam1({} as SleeperLeagueTeam);
            setTeam2({} as SleeperLeagueTeam);
        }
    }, [userLeagues.sleeper]);

    useEffect(() => {
        if (selectedLeagueId && userLeagues.sleeper.length) {
            const selectedLeague: SleeperLeague = userLeagues.sleeper.find(
                (league) => league.leagueId === selectedLeagueId
            )!;

            setSelectedLeague(selectedLeague);
            setTeam1(selectedLeague.teams[0]);
            setTeam2(selectedLeague.teams[1]);
        }
    }, [selectedLeagueId]);

    const {
        team1GTMResults,
        team2GTMResults,
        combinedGTMResults,
    } = useGarbageTimeMatchups(selectedLeague, team1, team2);

    const { memberMap } = useMemberMap(selectedLeague);

    // RENDER INITIALLY LOADING
    if (!isInitiallyLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size='large' />
            </View>
        );
    }

    // RENDER EMPTY LEAGUES
    if (!userLeagues.sleeper.length || !selectedLeague || !selectedLeagueId) {
        return (
            <View
                style={{
                    flex: 1,
                    backgroundColor: 'white',
                    justifyContent: 'center',
                    alignContent: 'center',
                }}
            >
                <Text
                    style={{
                        textAlign: 'center',
                        color: '#adadad',
                    }}
                >
                    {constants.GTM_ADD_LEAGUE_MESSAGE}
                </Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={styles.container}>
            <GarbageTimeMatchupsLeaguePicker
                selectedLeagueId={selectedLeagueId}
                userLeagues={userLeagues}
                setOverlay={setOverlay}
            />

            <Divider />

            {selectedLeague?.teams && (
                <>
                    <View style={styles.teamsHeaderContainer}>
                        <GarbageTimeMatchupsTeamHeader
                            team={team1}
                            teamNumber={1}
                            memberMap={memberMap}
                            gtmResults={team1GTMResults}
                            selectedLeague={selectedLeague}
                            setSelectedTeam={setSelectedTeam}
                            setOverlay={setOverlay}
                        />

                        <GarbageTimeMatchupsTeamHeader
                            team={team2}
                            teamNumber={2}
                            memberMap={memberMap}
                            gtmResults={team2GTMResults}
                            selectedLeague={selectedLeague}
                            setSelectedTeam={setSelectedTeam}
                            setOverlay={setOverlay}
                        />
                    </View>

                    <GarbageTimeMatchupsList
                        selectedLeague={selectedLeague}
                        combinedGTMResults={combinedGTMResults}
                    />
                </>
            )}

            <Overlay
                overlayStyle={styles.leagueSelectOverlayStyle}
                isVisible={overlay === OverlayTypes.LeagueSelect}
                onBackdropPress={() => setOverlay(OverlayTypes.None)}
            >
                <FlatList
                    data={userLeagues.sleeper}
                    keyExtractor={(item) => item.leagueId}
                    renderItem={({ item }: { item: SleeperLeague }) => (
                        <LeagueInfoListItem
                            leagueName={item.leagueName}
                            seasonId={item.seasonId}
                            totalTeams={item.teams.length}
                            leagueAvatar={item.avatar}
                            onItemPressCallback={() => {
                                setSelectedLeagueId(item.leagueId);
                                setOverlay(OverlayTypes.None);
                            }}
                        />
                    )}
                />
            </Overlay>

            <Overlay
                overlayStyle={styles.teamSelectOverlayStyle}
                isVisible={overlay === OverlayTypes.TeamSelect}
                onBackdropPress={() => setOverlay(OverlayTypes.None)}
            >
                <GarbageTimeTeamSelectList
                    selectedLeague={selectedLeague}
                    team1={team1}
                    team2={team2}
                    selectedTeam={selectedTeam}
                    memberMap={memberMap}
                    setTeam1={setTeam1}
                    setTeam2={setTeam2}
                    setOverlay={setOverlay}
                />
            </Overlay>

            <Overlay
                overlayStyle={styles.infoOverlayStyle}
                isVisible={overlay === OverlayTypes.GTRInfo}
                onBackdropPress={() => setOverlay(OverlayTypes.None)}
            >
                <View>
                    <View style={styles.infoOverlayHeaderContainer}>
                        <Text>{constants.GTR_INFO_HEADER}</Text>
                    </View>

                    <Divider />

                    <View style={styles.infoOverlayDescriptionContainer}>
                        <Text>{constants.GTR_INFO_DESCRIPTION}</Text>
                    </View>
                </View>
            </Overlay>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    teamsHeaderContainer: { flexDirection: 'row' },
    leagueSelectOverlayStyle: {
        flexDirection: 'row',
        height: '50%',
        marginLeft: 20,
        marginRight: 20,
    },
    teamSelectOverlayStyle: {
        flexDirection: 'row',
        height: '50%',
        marginLeft: 20,
        marginRight: 20,
    },
    infoOverlayStyle: {
        marginLeft: 20,
        marginRight: 20,
        height: '15%',
    },
    infoOverlayHeaderContainer: {
        paddingBottom: 4,
    },
    infoOverlayDescriptionContainer: {
        paddingTop: 4,
    },
});
