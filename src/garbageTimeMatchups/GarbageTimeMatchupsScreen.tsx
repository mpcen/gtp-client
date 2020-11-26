import React, { useState, useEffect } from 'react';
import {
    View,
    StyleSheet,
    SafeAreaView,
    Text,
    ActivityIndicator,
} from 'react-native';
import { useSelector } from 'react-redux';
import { Divider, Overlay } from 'react-native-elements';

import * as constants from './constants';
import { RootState } from '../store/rootReducer';
import {
    ESPNLeague,
    SleeperLeague,
    SleeperLeagueTeam,
} from '../leagues/store/storeTypes';
import { useSleeperMemberMap } from './hooks/useSleeperMemberMap';
import { useSleeperGarbageTimeMatchups } from './hooks/useSleeperGarbageTimeMatchups';
import { OverlayTypes } from './types';

import { GarbageTimeMatchupsTeamHeader } from './components/h2hGTM/GarbageTimeMatchupsTeamHeader';
import { GarbageTimeTeamSelectList } from './components/h2hGTM/GarbageTimeTeamSelectList';
import { GarbageTimeMatchupsList } from './components/h2hGTM/GarbageTimeMatchupsList';
import { GarbageTimeMatchupsLeaguePicker } from './components/GarbageTimeMatchupsLeaguePicker';
import { GarbageTimeMatchupsCompareSelector } from './components/GarbageTimeMatchupsCompareSelector';
import { GarbageTimeMatchupsTeamPicker } from './components/soloGTM/GarbageTimeMatchupTeamPicker';
import { Color } from '../common/styles/colors';
import { Font } from '../common/fonts/fonts';
import { GarbageTimeMatchupsListSolo } from './components/soloGTM/GarbageTimeMatchupsListSolo';
import { GarbageTimeMatchupsLeagueSelectOverlay } from './components/leagueSelectOverlay/GarbageTimeMatchupsLeagueSelectOverlay';
import { LeaguePlatform } from '../leagues/types';

export const GarbageTimeMatchupsScreen = () => {
    const { userLeagues } = useSelector((state: RootState) => state.leagues);
    const [selectedPlatform, setSelectedPlatform] = useState(
        LeaguePlatform.Sleeper
    );
    const [isH2H, setIsH2H] = useState(false);
    const [isInitiallyLoaded, setIsInitiallyLoaded] = useState(false);
    const [overlay, setOverlay] = useState(OverlayTypes.None);

    // SLEEPER
    const [selectedSleeperLeague, setSelectedSleeperLeague] = useState(
        {} as SleeperLeague
    );
    const [sleeperTeam1, setSleeperTeam1] = useState({} as SleeperLeagueTeam);
    const [team2, setTeam2] = useState({} as SleeperLeagueTeam);
    const [soloTeam, setSoloTeam] = useState({} as SleeperLeagueTeam);
    const [selectedTeam, setSelectedTeam] = useState(0);

    useEffect(() => {
        setIsInitiallyLoaded(true);
    }, []);

    useEffect(() => {
        if (selectedPlatform === LeaguePlatform.Sleeper) {
            if (userLeagues.sleeper.length) {
                const defaultSelectedLeague = userLeagues.sleeper[0];

                setSelectedSleeperLeague(defaultSelectedLeague);
                setSleeperTeam1(defaultSelectedLeague.teams[0]);
                setTeam2(defaultSelectedLeague.teams[1]);
                setSoloTeam(defaultSelectedLeague.teams[0]);
            } else if (
                !userLeagues.sleeper.length &&
                Object.keys(selectedSleeperLeague).length
            ) {
                setSelectedSleeperLeague({} as SleeperLeague);
                setSleeperTeam1({} as SleeperLeagueTeam);
                setTeam2({} as SleeperLeagueTeam);
                setSoloTeam({} as SleeperLeagueTeam);
            }
        }
    }, [selectedPlatform, userLeagues.sleeper]);

    useEffect(() => {
        if (selectedPlatform === LeaguePlatform.Sleeper) {
            if (
                Object.keys(selectedSleeperLeague).length &&
                userLeagues.sleeper.length
            ) {
                const updatedSelectedLeague: SleeperLeague = userLeagues.sleeper.find(
                    (league) =>
                        league.leagueId === selectedSleeperLeague.leagueId
                )!;

                setSelectedSleeperLeague(updatedSelectedLeague);
                setSleeperTeam1(selectedSleeperLeague.teams[0]);
                setTeam2(selectedSleeperLeague.teams[1]);
                setSoloTeam(selectedSleeperLeague.teams[0]);
                setOverlay(OverlayTypes.None);
            }
        }
    }, [selectedPlatform, selectedSleeperLeague]);

    const {
        team1GTMResults,
        team2GTMResults,
        combinedGTMResults,
        soloGTMResults,
    } = useSleeperGarbageTimeMatchups(
        selectedSleeperLeague,
        isH2H,
        sleeperTeam1,
        team2,
        soloTeam
    );

    const { memberMap } = useSleeperMemberMap(selectedSleeperLeague);

    // RENDER INITIALLY LOADING
    if (!isInitiallyLoaded) {
        return (
            <View style={{ flex: 1, justifyContent: 'center' }}>
                <ActivityIndicator size="large" />
            </View>
        );
    }

    // RENDER EMPTY LEAGUES
    if (
        !userLeagues.sleeper.length ||
        !Object.keys(selectedSleeperLeague).length
    ) {
        return (
            <View style={styles.emptyContainer}>
                <Text style={styles.emptyContainerText}>
                    {constants.GTM_AddLeagueMessage}
                </Text>
            </View>
        );
    }

    // RENDER GTM
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.leagueHeaderContainer}>
                <GarbageTimeMatchupsLeaguePicker
                    selectedLeague={selectedSleeperLeague}
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
            {!isH2H &&
            selectedSleeperLeague.teams &&
            Object.keys(memberMap).length ? (
                <>
                    <View
                        style={{
                            paddingLeft: 16,
                            paddingRight: 16,
                            alignSelf: 'center',
                        }}
                    >
                        <GarbageTimeMatchupsTeamPicker
                            league={selectedSleeperLeague}
                            team={soloTeam}
                            memberMap={memberMap}
                            setOverlay={setOverlay}
                        />
                    </View>

                    <GarbageTimeMatchupsListSolo
                        soloTeam={soloTeam}
                        memberMap={memberMap}
                        soloGTMResults={soloGTMResults}
                        league={selectedSleeperLeague}
                        setOverlay={setOverlay}
                    />
                </>
            ) : null}

            {/* H2H GTM VIEW */}
            {isH2H &&
            selectedSleeperLeague.teams &&
            Object.keys(memberMap).length &&
            Object.keys(team1GTMResults).length &&
            Object.keys(team2GTMResults).length ? (
                <>
                    <View style={styles.teamsHeaderContainer}>
                        <GarbageTimeMatchupsTeamHeader
                            team={sleeperTeam1}
                            teamNumber={1}
                            memberMap={memberMap}
                            gtmResults={team1GTMResults}
                            selectedLeague={selectedSleeperLeague}
                            setSelectedTeam={setSelectedTeam}
                            setOverlay={setOverlay}
                        />

                        <GarbageTimeMatchupsTeamHeader
                            team={team2}
                            teamNumber={2}
                            memberMap={memberMap}
                            gtmResults={team2GTMResults}
                            selectedLeague={selectedSleeperLeague}
                            setSelectedTeam={setSelectedTeam}
                            setOverlay={setOverlay}
                        />
                    </View>

                    <GarbageTimeMatchupsList
                        selectedLeague={selectedSleeperLeague}
                        combinedGTMResults={combinedGTMResults}
                    />
                </>
            ) : null}

            {/* OVERLAYS */}
            {/* LEAGUE SELECT */}
            <GarbageTimeMatchupsLeagueSelectOverlay
                overlay={overlay}
                userLeagues={userLeagues}
                setSelectedPlatform={setSelectedPlatform}
                setSelectedSleeperLeague={setSelectedSleeperLeague}
                setOverlay={setOverlay}
            />

            {/* TEAM SELECT */}
            <Overlay
                overlayStyle={styles.teamSelectOverlayStyle}
                isVisible={overlay === OverlayTypes.TeamSelect}
                onBackdropPress={() => setOverlay(OverlayTypes.None)}
            >
                <GarbageTimeTeamSelectList
                    selectedLeague={selectedSleeperLeague}
                    team1={sleeperTeam1}
                    team2={team2}
                    soloTeam={soloTeam}
                    selectedTeam={selectedTeam}
                    memberMap={memberMap}
                    isH2H={isH2H}
                    setTeam1={setSleeperTeam1}
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
