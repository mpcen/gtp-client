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
    ESPNLeagueTeam,
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
import { useESPNGarbageTimeMatchups } from './hooks/espn/useESPNGarbageTimeMatchups';
import { useESPNMemberMap } from './hooks/espn/useESPNMemberMap';

export const GarbageTimeMatchupsScreen = () => {
    const { userLeagues } = useSelector((state: RootState) => state.leagues);
    const [leaguePlatform, setLeaguePlatform] = useState(
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
    const [sleeperTeam2, setSleeperTeam2] = useState({} as SleeperLeagueTeam);
    const [sleeperSoloTeam, setSleeperSoloTeam] = useState(
        {} as SleeperLeagueTeam
    );
    const [selectedSleeperTeamNumber, setSelectedSleeperTeamNumber] = useState(
        0
    );

    // ESPN
    const [selectedESPNLeague, setSelectedESPNLeague] = useState(
        {} as ESPNLeague
    );
    const [espnTeam1, setESPNTeam1] = useState({} as ESPNLeagueTeam);
    const [espnTeam2, setESPNTeam2] = useState({} as ESPNLeagueTeam);
    const [espnSoloTeam, setESPNSoloTeam] = useState({} as ESPNLeagueTeam);
    const [selectedESPNTeamNumber, setSelectedESPNTeamNumber] = useState(0);

    // INITIAL LOAD EFFECT
    useEffect(() => {
        setIsInitiallyLoaded(true);

        if (userLeagues.sleeper.length) {
            setSelectedSleeperLeague(userLeagues.sleeper[0]);
            setSleeperTeam1(userLeagues.sleeper[0].teams[0]);
            setSleeperTeam2(userLeagues.sleeper[0].teams[1]);
            setSleeperSoloTeam(userLeagues.sleeper[0].teams[0]);
        }

        if (userLeagues.espn.length) {
            setSelectedESPNLeague(userLeagues.espn[0]);
            setESPNTeam1(userLeagues.espn[0].teams[0]);
            setESPNTeam2(userLeagues.espn[0].teams[1]);
            setESPNSoloTeam(userLeagues.espn[0].teams[0]);
        }
    }, []);

    // EDGE CASE EFFECT
    useEffect(() => {
        if (leaguePlatform === LeaguePlatform.Sleeper) {
            // IF WE HAVE SLEEPER LEAGUES BUT HAVE REMOVED THE SELECTED LEAGUE, CHOOSE THE FIRST SLEEPER LEAGUE
            if (
                userLeagues.sleeper.length &&
                userLeagues.sleeper.find(
                    (league: SleeperLeague) =>
                        league.leagueId === selectedSleeperLeague.leagueId
                ) === undefined
            ) {
                setSelectedSleeperLeague(userLeagues.sleeper[0]);
                setSleeperTeam1(userLeagues.sleeper[0].teams[0]);
                setSleeperTeam2(userLeagues.sleeper[0].teams[1]);
                setSleeperSoloTeam(userLeagues.sleeper[0].teams[0]);
            }
            // IF ALL SLEEPER LEAGUES WERE REMOVED
            else if (
                !userLeagues.sleeper.length &&
                Object.keys(selectedSleeperLeague).length
            ) {
                setSelectedSleeperLeague({} as SleeperLeague);
                setSleeperTeam1({} as SleeperLeagueTeam);
                setSleeperTeam2({} as SleeperLeagueTeam);
                setSleeperSoloTeam({} as SleeperLeagueTeam);
            }
        }

        // IF WE HAVE ESPN LEAGUES BUT HAVE REMOVED THE SELECTED LEAGUE, CHOOSE THE FIRST ESPN LEAGUE
        else if (leaguePlatform === LeaguePlatform.ESPN) {
            if (
                userLeagues.espn.length &&
                userLeagues.espn.find(
                    (league: ESPNLeague) =>
                        league.leagueId === selectedESPNLeague.leagueId
                ) === undefined
            ) {
                setSelectedESPNLeague(userLeagues.espn[0]);
                setESPNTeam1(userLeagues.espn[0].teams[0]);
                setESPNTeam2(userLeagues.espn[0].teams[1]);
                setESPNSoloTeam(userLeagues.espn[0].teams[0]);
            }

            // IF ALL ESPN LEAGUES WERE REMOVED
            else if (
                !userLeagues.espn.length &&
                Object.keys(selectedESPNLeague).length
            ) {
                setSelectedESPNLeague({} as ESPNLeague);
                setESPNTeam1({} as ESPNLeagueTeam);
                setESPNTeam2({} as ESPNLeagueTeam);
            }
        }
    }, [leaguePlatform, userLeagues.sleeper, userLeagues.espn]);

    // ANY-CHANGE EFFECT
    useEffect(() => {
        // SLEEPER
        if (leaguePlatform === LeaguePlatform.Sleeper) {
            if (Object.keys(selectedSleeperLeague).length) {
                setSleeperTeam1(selectedSleeperLeague.teams[0]);
                setSleeperTeam2(selectedSleeperLeague.teams[1]);
                setSleeperSoloTeam(selectedSleeperLeague.teams[0]);
                setOverlay(OverlayTypes.None);
            }
        }

        // ESPN
        if (leaguePlatform === LeaguePlatform.ESPN) {
            if (Object.keys(selectedESPNLeague).length) {
                setESPNTeam1(selectedESPNLeague.teams[0]);
                setESPNTeam2(selectedESPNLeague.teams[1]);
                setESPNSoloTeam(selectedESPNLeague.teams[0]);
                setOverlay(OverlayTypes.None);
            }
        }
    }, [leaguePlatform, selectedSleeperLeague, selectedESPNLeague]);

    // USE SLEEPER GTM
    const {
        team1GTMResults,
        team2GTMResults,
        combinedGTMResults,
        soloGTMResults,
    } = useSleeperGarbageTimeMatchups(
        selectedSleeperLeague,
        isH2H,
        sleeperTeam1,
        sleeperTeam2,
        sleeperSoloTeam
    );

    // USE ESPN GTM
    const {
        espnTeam1GTMResults,
        espnTeam2GTMResults,
        espnCombinedGTMResults,
        espnSoloGTMResults,
    } = useESPNGarbageTimeMatchups(
        selectedESPNLeague,
        isH2H,
        espnTeam1,
        espnTeam2,
        espnSoloTeam
    );

    const { sleeperMemberMap } = useSleeperMemberMap(selectedSleeperLeague);
    const { espnMemberMap } = useESPNMemberMap(selectedESPNLeague);

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
                {/* LEAGUE SELECT */}
                <GarbageTimeMatchupsLeaguePicker
                    leaguePlatform={leaguePlatform}
                    selectedSleeperLeague={selectedSleeperLeague}
                    selectedESPNLeague={selectedESPNLeague}
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
            Object.keys(sleeperMemberMap).length ? (
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
                            team={sleeperSoloTeam}
                            memberMap={sleeperMemberMap}
                            setOverlay={setOverlay}
                        />
                    </View>

                    <GarbageTimeMatchupsListSolo
                        soloTeam={sleeperSoloTeam}
                        memberMap={sleeperMemberMap}
                        soloGTMResults={soloGTMResults}
                        league={selectedSleeperLeague}
                        setOverlay={setOverlay}
                    />
                </>
            ) : null}

            {/* H2H GTM VIEW */}
            {isH2H &&
            selectedSleeperLeague.teams &&
            Object.keys(sleeperMemberMap).length &&
            Object.keys(team1GTMResults).length &&
            Object.keys(team2GTMResults).length ? (
                <>
                    <View style={styles.teamsHeaderContainer}>
                        <GarbageTimeMatchupsTeamHeader
                            team={sleeperTeam1}
                            teamNumber={1}
                            memberMap={sleeperMemberMap}
                            gtmResults={team1GTMResults}
                            selectedLeague={selectedSleeperLeague}
                            setSelectedTeam={setSelectedSleeperTeamNumber}
                            setOverlay={setOverlay}
                        />

                        <GarbageTimeMatchupsTeamHeader
                            team={sleeperTeam2}
                            teamNumber={2}
                            memberMap={sleeperMemberMap}
                            gtmResults={team2GTMResults}
                            selectedLeague={selectedSleeperLeague}
                            setSelectedTeam={setSelectedSleeperTeamNumber}
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
                setLeaguePlatform={setLeaguePlatform}
                setSelectedSleeperLeague={setSelectedSleeperLeague}
                setSelectedESPNLeague={setSelectedESPNLeague}
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
                    team2={sleeperTeam2}
                    soloTeam={sleeperSoloTeam}
                    selectedTeam={selectedSleeperTeamNumber}
                    memberMap={sleeperMemberMap}
                    isH2H={isH2H}
                    setTeam1={setSleeperTeam1}
                    setTeam2={setSleeperTeam2}
                    setSoloTeam={setSleeperSoloTeam}
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
