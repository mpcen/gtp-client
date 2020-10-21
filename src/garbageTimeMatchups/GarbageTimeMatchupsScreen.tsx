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
import { useNavigation } from '@react-navigation/native';
import { Divider, Overlay, Button } from 'react-native-elements';

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
import { GarbageTimeMatchupsCompareSelector } from './components/GarbageTimeMatchupsCompareSelector';
import { GarbageTimeMatchupsTeamPicker } from './components/GarbageTimeMatchupTeamPicker';
import { Color } from '../common/styles/colors';
import { Font } from '../common/fonts/fonts';
import { GarbageTimeMatchupsListSolo } from './components/GarbageTimeMatchupsListSolo';

export const GarbageTimeMatchupsScreen = () => {
    const { navigate } = useNavigation();
    const { userLeagues } = useSelector((state: RootState) => state.leagues);
    const [selectedLeagueId, setSelectedLeagueId] = useState('');
    const [selectedLeague, setSelectedLeague] = useState({} as SleeperLeague);
    const [team1, setTeam1] = useState({} as SleeperLeagueTeam);
    const [team2, setTeam2] = useState({} as SleeperLeagueTeam);
    const [soloTeam, setSoloTeam] = useState({} as SleeperLeagueTeam);
    const [selectedTeam, setSelectedTeam] = useState(0);
    const [overlay, setOverlay] = useState(OverlayTypes.None);
    const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
    const [isH2H, setIsH2H] = useState(false);

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
            setSoloTeam(defaultSelectedLeague.teams[0]);
        } else if (!userLeagues.sleeper.length && selectedLeagueId) {
            setSelectedLeagueId('');
            setSelectedLeague({} as SleeperLeague);
            setTeam1({} as SleeperLeagueTeam);
            setTeam2({} as SleeperLeagueTeam);
            setSoloTeam({} as SleeperLeagueTeam);
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
            setSoloTeam(selectedLeague.teams[0]);
        }
    }, [selectedLeagueId]);

    const {
        team1GTMResults,
        team2GTMResults,
        combinedGTMResults,
        soloGTMResults,
    } = useGarbageTimeMatchups(selectedLeague, isH2H, team1, team2, soloTeam);

    const { memberMap } = useMemberMap(selectedLeague);

    // RENDER INITIALLY LOADING
    if (!isInitiallyLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // RENDER EMPTY LEAGUES
    if (!userLeagues.sleeper.length || !selectedLeague || !selectedLeagueId) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyContainerText}>
                    {constants.GTM_AddLeagueMessage}
                </Text>

                <Button
                    type="solid"
                    containerStyle={styles.addLeagueButtonContainer}
                    buttonStyle={styles.addLeagueButton}
                    title={constants.GTM_ADD_LEAGUE}
                    titleStyle={styles.addLeagueButtonTitleStyle}
                    onPress={() => navigate('ImportSleeperLeagues')}
                />
            </View>
        );
    }

    // RENDER GTM
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.leagueHeaderContainer}>
                <GarbageTimeMatchupsLeaguePicker
                    selectedLeagueId={selectedLeagueId}
                    userLeagues={userLeagues}
                    setOverlay={setOverlay}
                />

                {/* TOGGLE COMPARE TYPE */}
                <GarbageTimeMatchupsCompareSelector
                    isH2H={isH2H}
                    setIsH2H={setIsH2H}
                />
            </View>

            <Divider />

            {/* ALL GTM VIEW */}
            {!isH2H && selectedLeague.teams && Object.keys(memberMap).length ? (
                <>
                    <View
                        style={{
                            paddingLeft: 16,
                            paddingRight: 16,
                            alignSelf: 'center',
                        }}
                    >
                        <GarbageTimeMatchupsTeamPicker
                            league={selectedLeague}
                            team={soloTeam}
                            memberMap={memberMap}
                            setOverlay={setOverlay}
                        />
                    </View>

                    <GarbageTimeMatchupsListSolo
                        soloTeam={soloTeam}
                        memberMap={memberMap}
                        soloGTMResults={soloGTMResults}
                        league={selectedLeague}
                        setOverlay={setOverlay}
                    />
                </>
            ) : null}

            {/* H2H GTM VIEW */}
            {isH2H &&
            selectedLeague.teams &&
            Object.keys(memberMap).length &&
            Object.keys(team1GTMResults).length &&
            Object.keys(team2GTMResults).length ? (
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
            ) : null}

            {/* OVERLAYS */}
            {/* LEAGUE SELECT */}
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

            {/* TEAM SELECT */}
            <Overlay
                overlayStyle={styles.teamSelectOverlayStyle}
                isVisible={overlay === OverlayTypes.TeamSelect}
                onBackdropPress={() => setOverlay(OverlayTypes.None)}
            >
                <GarbageTimeTeamSelectList
                    selectedLeague={selectedLeague}
                    team1={team1}
                    team2={team2}
                    soloTeam={soloTeam}
                    selectedTeam={selectedTeam}
                    memberMap={memberMap}
                    isH2H={isH2H}
                    setTeam1={setTeam1}
                    setTeam2={setTeam2}
                    setSoloTeam={setSoloTeam}
                    setOverlay={setOverlay}
                />
            </Overlay>

            {/* GTR INFO */}
            <Overlay
                overlayStyle={styles.infoOverlayStyle}
                isVisible={overlay === OverlayTypes.GTRInfo}
                onBackdropPress={() => setOverlay(OverlayTypes.None)}
            >
                <View style={styles.gtrInfoContaier}>
                    <View style={styles.infoOverlayHeaderContainer}>
                        <Text
                            style={[
                                styles.gtrInfoOverlayText,
                                styles.gtrInfoOverlayHeader,
                            ]}
                        >
                            {constants.GTR_INFO_HEADER}
                        </Text>
                    </View>

                    <Divider />

                    <View style={styles.infoOverlayDescriptionContainer}>
                        <Text style={styles.gtrInfoOverlayText}>
                            {constants.GTR_INFO_DESCRIPTION}
                        </Text>
                    </View>
                </View>
            </Overlay>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: Color.PureWhite },
    leagueHeaderContainer: { paddingTop: 16, paddingBottom: 16 },
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
        height: '24%',
    },
    infoOverlayHeaderContainer: {
        paddingBottom: 4,
    },
    infoOverlayDescriptionContainer: {
        paddingTop: 4,
        flex: 1,
        justifyContent: 'center',
    },
    emptyContainer: {
        flex: 1,
        backgroundColor: Color.PureWhite,
        justifyContent: 'center',
        alignContent: 'center',
    },
    emptyContainerText: {
        fontSize: 18,
        textAlign: 'center',
        fontFamily: Font.BebasNeue_400Regular,
        color: Color.MainBlack,
    },
    addLeagueButtonContainer: {
        width: 120,
        alignSelf: 'center',
        marginTop: 64,
    },
    addLeagueButton: {
        backgroundColor: Color.MainBlack,
    },
    addLeagueButtonTitleStyle: {
        fontFamily: Font.BebasNeue_400Regular,
    },
    gtrInfoContaier: {
        padding: 8,
    },
    gtrInfoOverlayText: {
        fontSize: 16,
    },
    gtrInfoOverlayHeader: {
        fontFamily: Font.BebasNeue_400Regular,
        fontSize: 24,
        textAlign: 'center',
    },
});
