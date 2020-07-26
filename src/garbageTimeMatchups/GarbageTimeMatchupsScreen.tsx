import React, { useState, useEffect } from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-community/picker';

import { RootState } from '../store/rootReducer';
import { SleeperLeague, SleeperLeagueTeam } from '../leagues/store/storeTypes';
import { Divider, Overlay } from 'react-native-elements';
import { GarbageTimeMatchupsTeamHeader } from './components/GarbageTimeMatchupsTeamHeader';
import { useGarbageTimeMatchups } from './hooks/useGarbageTimeMatchups';
import { TeamSelectList } from './components/TeamSelectList';
import { GarbageTimeMatchupsList } from './components/GarbageTimeMatchupsList';
import { useMemberMap } from './hooks/useMemberMap';

export const GarbageTimeMatchupsScreen = () => {
    const { userLeagues } = useSelector((state: RootState) => state.leagues);
    const [selectedLeagueId, setSelectedLeagueId] = useState('');
    const [selectedLeague, setSelectedLeague] = useState({} as SleeperLeague);
    const [team1, setTeam1] = useState({} as SleeperLeagueTeam);
    const [team2, setTeam2] = useState({} as SleeperLeagueTeam);
    const [selectedTeam, setSelectedTeam] = useState(0);
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);

    useEffect(() => {
        if (userLeagues) {
            const defaultSelectedLeague = userLeagues.sleeper[0];

            setSelectedLeagueId(defaultSelectedLeague.leagueId);
            setSelectedLeague(defaultSelectedLeague);
            setTeam1(defaultSelectedLeague.teams[0]);
            setTeam2(defaultSelectedLeague.teams[1]);
        }
    }, [userLeagues]);

    useEffect(() => {
        if (selectedLeagueId) {
            const selectedLeague: SleeperLeague = userLeagues.sleeper.find(
                (league) => league.leagueId === selectedLeagueId
            )!;

            setSelectedLeagueId(selectedLeagueId);
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

    const { memberMap } = useMemberMap(selectedLeague.members);

    return (
        <SafeAreaView style={styles.container}>
            <Picker
                selectedValue={selectedLeagueId}
                onValueChange={(leagueId) =>
                    setSelectedLeagueId(leagueId as string)
                }
            >
                {userLeagues.sleeper.map((league: SleeperLeague) => (
                    <Picker.Item
                        key={league.leagueId}
                        label={league.leagueName}
                        value={league.leagueId}
                    />
                ))}
            </Picker>

            <Divider />

            {selectedLeague?.teams?.length && memberMap && (
                <>
                    <View style={styles.teamsHeaderContainer}>
                        <GarbageTimeMatchupsTeamHeader
                            team={team1}
                            teamNumber={1}
                            memberMap={memberMap}
                            gtmResults={team1GTMResults}
                            selectedLeague={selectedLeague}
                            setSelectedTeam={setSelectedTeam}
                            setIsOverlayVisible={setIsOverlayVisible}
                        />

                        <GarbageTimeMatchupsTeamHeader
                            team={team2}
                            teamNumber={2}
                            memberMap={memberMap}
                            gtmResults={team2GTMResults}
                            selectedLeague={selectedLeague}
                            setSelectedTeam={setSelectedTeam}
                            setIsOverlayVisible={setIsOverlayVisible}
                        />
                    </View>

                    <GarbageTimeMatchupsList
                        selectedLeague={selectedLeague}
                        combinedGTMResults={combinedGTMResults}
                    />
                </>
            )}

            <Overlay
                overlayStyle={styles.overlayStyle}
                isVisible={isOverlayVisible}
                onBackdropPress={() => setIsOverlayVisible(false)}
            >
                <TeamSelectList
                    selectedLeague={selectedLeague}
                    team1={team1}
                    team2={team2}
                    selectedTeam={selectedTeam}
                    setTeam1={setTeam1}
                    setTeam2={setTeam2}
                    setIsOverlayVisible={setIsOverlayVisible}
                />
            </Overlay>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: 'white' },
    teamsHeaderContainer: { flexDirection: 'row' },
    overlayStyle: {
        flexDirection: 'row',
        height: '50%',
        marginLeft: 20,
        marginRight: 20,
    },
});
