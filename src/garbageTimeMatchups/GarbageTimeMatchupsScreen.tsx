import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList } from 'react-native';
import { useSelector } from 'react-redux';
import { Picker } from '@react-native-community/picker';

import { RootState } from '../store/rootReducer';
import { SleeperLeague, SleeperLeagueTeam } from '../leagues/store/storeTypes';
import { Divider, ListItem, Overlay } from 'react-native-elements';
import { TeamHeader } from './components/TeamHeader';
import { useGarbageTimeMatchups } from './useGarbageTimeMatchups';

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

    const { team1GTMs, team2GTMs } = useGarbageTimeMatchups(
        selectedLeague,
        team1,
        team2
    );

    return (
        <View>
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

            {selectedLeague?.teams?.length && (
                <View style={styles.teamsHeaderContainer}>
                    <TeamHeader
                        team={team1}
                        teamNumber={1}
                        selectedLeague={selectedLeague}
                        setSelectedTeam={setSelectedTeam}
                        setIsOverlayVisible={setIsOverlayVisible}
                    />

                    <TeamHeader
                        team={team2}
                        teamNumber={2}
                        selectedLeague={selectedLeague}
                        setSelectedTeam={setSelectedTeam}
                        setIsOverlayVisible={setIsOverlayVisible}
                    />
                </View>
            )}

            <Overlay
                overlayStyle={styles.overlayStyle}
                isVisible={isOverlayVisible}
                onBackdropPress={() => setIsOverlayVisible(false)}
            >
                <FlatList
                    data={selectedLeague?.teams?.filter(
                        (team) =>
                            team1?.teamId === team.teamId ||
                            team2?.teamId === team.teamId ||
                            true
                    )}
                    keyExtractor={(item) => item.teamId}
                    renderItem={({ item }: { item: SleeperLeagueTeam }) => (
                        <ListItem
                            key={item.teamId}
                            title={
                                item.nickname ||
                                selectedLeague.members.find(
                                    (member) =>
                                        member.memberId === item.ownerIds[0]
                                )?.displayName
                            }
                            bottomDivider
                            onPress={() => {
                                if (selectedTeam === 1) {
                                    setTeam1(item);
                                } else {
                                    setTeam2(item);
                                }

                                setIsOverlayVisible(false);
                            }}
                        />
                    )}
                />
            </Overlay>

            <View style={{ borderWidth: 1, borderColor: 'red' }}></View>
        </View>
    );
};

const styles = StyleSheet.create({
    teamsHeaderContainer: { flexDirection: 'row' },
    overlayStyle: {
        flexDirection: 'row',
        height: '50%',
        marginLeft: 20,
        marginRight: 20,
    },
});
