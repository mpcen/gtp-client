import { useState, useEffect } from 'react';

import {
    ESPNLeague,
    ESPNLeagueMatchup,
    ESPNLeagueTeam,
} from '../../../leagues/store/storeTypes';

export type Matchup = {
    self: {
        teamId: number;
        totalPoints: any;
    };
    opponent: {
        teamId: number;
        totalPoints: any;
    };
};

export type ESPNGTMResult = {
    wins: number;
    losses: number;
    ties: number;
    matchups: ESPNLeagueMatchup[];
};

export type SoloGTMResult = {
    opponent: ESPNLeagueTeam;
    wins: number;
    losses: number;
    ties: number;
    matchups: ESPNLeagueMatchup[];
};

export type CombinedGTMResult = {
    t1: ESPNLeagueMatchup;
    t2: ESPNLeagueMatchup;
};

export const useESPNGarbageTimeMatchups = (
    selectedLeague: ESPNLeague,
    isH2H: boolean,
    team1: ESPNLeagueTeam,
    team2: ESPNLeagueTeam,
    soloTeam: ESPNLeagueTeam
) => {
    const [team1GTMResults, setTeam1GTMResults] = useState({} as ESPNGTMResult);
    const [team2GTMResults, setTeam2GTMResults] = useState({} as ESPNGTMResult);
    const [combinedGTMResults, setCombinedGTMResults] = useState(
        [] as CombinedGTMResult[]
    );
    const [soloGTMResults, setSoloGTMResults] = useState([] as SoloGTMResult[]);

    /*
        Filters out all regular season matches for a single team and returns a map:
        Week: {
            self: { SleeperLeagueMatchup },
            opponent: { SleeperLeagueMatchup }
        }
    */
    const createTeamMatchupsMap = (
        matchups: ESPNLeagueMatchup[],
        team: ESPNLeagueTeam
    ): Map<string, Matchup> => {
        const teamMatchupsMap = new Map<string, Matchup>(); // Map<week, Matchup>
        const regularSeasonMatchListForTeam = matchups.filter(
            (matchup: ESPNLeagueMatchup) =>
                (matchup.away.teamId === team.id ||
                    matchup.home.teamId === team.id) &&
                matchup.matchupWeek < selectedLeague.playoffWeekStart
        );

        regularSeasonMatchListForTeam.forEach((matchup) => {
            const self =
                matchup.away.teamId === team.id ? matchup.away : matchup.home;
            const opponent =
                matchup.away.teamId === team.id ? matchup.home : matchup.away;

            teamMatchupsMap.set(matchup.matchupWeek.toString(), {
                self,
                opponent,
            });
        });

        return teamMatchupsMap;
    };

    const createTeamGTMs = (
        team1MatchupsMap: Map<string, Matchup>,
        team2MatchupsMap: Map<string, Matchup>
    ): ESPNGTMResult => {
        const teamGTMResults: ESPNGTMResult = {
            wins: 0,
            losses: 0,
            ties: 0,
            matchups: [] as ESPNLeagueMatchup[],
        };

        for (let [week, team2Matchup] of team2MatchupsMap) {
            const teamMatchup: Matchup = team1MatchupsMap.get(week)!;
            const teamGTM = {
                matchupId: parseInt(week),
                matchupWeek: parseInt(week),
                winner: '',
                away: {
                    teamId: teamMatchup.self.teamId,
                    totalPoints: teamMatchup.self.totalPoints,
                },
                home: {
                    // get the opposing team unless the opposing team is itself.
                    teamId:
                        team2Matchup.opponent.teamId === teamMatchup.self.teamId
                            ? team2Matchup.self.teamId
                            : team2Matchup.opponent.teamId,
                    totalPoints:
                        team2Matchup.opponent.teamId === teamMatchup.self.teamId
                            ? team2Matchup.self.totalPoints
                            : team2Matchup.opponent.totalPoints,
                },
            } as ESPNLeagueMatchup;

            if (teamGTM.away.totalPoints > teamGTM.home.totalPoints) {
                teamGTM.winner = 'away';
                teamGTMResults.wins++;
            } else if (teamGTM.away.totalPoints < teamGTM.home.totalPoints) {
                teamGTM.winner = 'home';
                teamGTMResults.losses++;
            } else {
                teamGTM.winner = 'tie';
                teamGTMResults.ties++;
            }

            teamGTMResults.matchups.push(teamGTM);
        }

        return teamGTMResults;
    };

    const combineGTMResults = (
        team1GTMResults: ESPNGTMResult,
        team2GTMResults: ESPNGTMResult
    ): CombinedGTMResult[] => {
        const combinedGTMResults: CombinedGTMResult[] = [];

        for (let i = 0; i < team1GTMResults.matchups.length; i++) {
            combinedGTMResults.push({
                t1: team1GTMResults.matchups[i],
                t2: team2GTMResults.matchups[i],
            });
        }

        return combinedGTMResults;
    };

    useEffect(() => {
        if (
            (selectedLeague.leagueId && Object.keys(team1).length) ||
            (selectedLeague.leagueId && Object.keys(soloTeam).length)
        ) {
            // H2H GTM
            if (isH2H && Object.keys(team2).length) {
                const team1MatchupsMap = createTeamMatchupsMap(
                    selectedLeague.matchups,
                    team1
                );

                const team2MatchupsMap = createTeamMatchupsMap(
                    selectedLeague.matchups,
                    team2
                );

                const team1GTMResults: ESPNGTMResult = createTeamGTMs(
                    team1MatchupsMap,
                    team2MatchupsMap
                );

                const team2GTMResults: ESPNGTMResult = createTeamGTMs(
                    team2MatchupsMap,
                    team1MatchupsMap
                );

                const combinedGTMResults = combineGTMResults(
                    team1GTMResults,
                    team2GTMResults
                );

                setTeam1GTMResults(team1GTMResults);
                setTeam2GTMResults(team2GTMResults);
                setCombinedGTMResults(combinedGTMResults);
            } else {
                // ALL GTM
                const team1MatchupsMap = createTeamMatchupsMap(
                    selectedLeague.matchups,
                    soloTeam
                );

                const opposingTeams = selectedLeague.teams.filter(
                    (opposingTeam) => opposingTeam.id !== soloTeam.id
                );
                const soloTeamGTMResults: SoloGTMResult[] = [];

                opposingTeams.forEach((opposingTeam: ESPNLeagueTeam) => {
                    const opposingTeamMatchupsMap = createTeamMatchupsMap(
                        selectedLeague.matchups,
                        opposingTeam
                    );
                    const team1GTMResults: ESPNGTMResult = createTeamGTMs(
                        team1MatchupsMap,
                        opposingTeamMatchupsMap
                    );

                    soloTeamGTMResults.push({
                        opponent: opposingTeam,
                        ...team1GTMResults,
                    });
                });

                setSoloGTMResults(soloTeamGTMResults);
            }
        }
    }, [selectedLeague.leagueId, isH2H, team1.id, team2.id, soloTeam.id]);

    return {
        espnTeam1GTMResults: team1GTMResults,
        espnTeam2GTMResults: team2GTMResults,
        espnCombinedGTMResults: combinedGTMResults,
        espnSoloGTMResults: soloGTMResults,
    };
};
