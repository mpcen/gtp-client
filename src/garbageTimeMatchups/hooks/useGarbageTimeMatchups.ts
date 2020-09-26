import { useState, useEffect } from 'react';

import {
    SleeperLeagueTeam,
    SleeperLeagueMatchup,
    SleeperLeague,
} from '../../leagues/store/storeTypes';

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

export type GTMResult = {
    wins: number;
    losses: number;
    ties: number;
    matchups: SleeperLeagueMatchup[];
};

export type CombinedGTMResult = {
    t1: SleeperLeagueMatchup;
    t2: SleeperLeagueMatchup;
};

export const useGarbageTimeMatchups = (
    selectedLeague: SleeperLeague,
    team1: SleeperLeagueTeam,
    team2: SleeperLeagueTeam
): {
    team1GTMResults: GTMResult;
    team2GTMResults: GTMResult;
    combinedGTMResults: CombinedGTMResult[];
} => {
    const [team1GTMResults, setTeam1GTMResults] = useState({} as GTMResult);
    const [team2GTMResults, setTeam2GTMResults] = useState({} as GTMResult);
    const [combinedGTMResults, setCombinedGTMResults] = useState(
        [] as CombinedGTMResult[]
    );

    /*
        Filters out all regular season matches for a single team and returns a map:
        Week: {
            self: { SleeperLeagueMatchup },
            opponent: { SleeperLeagueMatchup }
        }
    */
    const createTeamMatchupsMap = (
        matchups: SleeperLeagueMatchup[],
        team: SleeperLeagueTeam
    ): Map<string, Matchup> => {
        const teamMatchupsMap = new Map<string, Matchup>(); // Map<week, Matchup>
        const regularSeasonMatchListForTeam = matchups.filter(
            (matchup: SleeperLeagueMatchup) =>
                (matchup.away.teamId.toString() === team.teamId ||
                    matchup.home.teamId.toString() === team.teamId) &&
                matchup.matchupWeek < selectedLeague.playoffWeekStart
        );

        regularSeasonMatchListForTeam.forEach((matchup) => {
            const self =
                matchup.away.teamId.toString() === team.teamId
                    ? matchup.away
                    : matchup.home;
            const opponent =
                matchup.away.teamId.toString() === team.teamId
                    ? matchup.home
                    : matchup.away;

            teamMatchupsMap.set(matchup.matchupWeek.toString(), {
                self,
                opponent,
            });
        });

        return teamMatchupsMap;
    };

    const createMedianScoringMap = (
        league: SleeperLeague
    ): Map<string, number> => {
        const medianForWeekMap = new Map<string, number>();
        const matchupsForWeekMap = new Map<string, SleeperLeagueMatchup[]>();

        // create Map<week, matchups>
        league.matchups.forEach((matchup: SleeperLeagueMatchup) => {
            const week = matchup.matchupWeek.toString();

            if (!matchupsForWeekMap.has(week)) {
                matchupsForWeekMap.set(week, []);
            }

            matchupsForWeekMap.get(week)!.push(matchup);
        });

        matchupsForWeekMap.forEach(
            (matchupsForWeek: SleeperLeagueMatchup[], week: string) => {
                let pointsForList: any[] = [];
                let medianForWeek = 0;

                matchupsForWeek.forEach((matchup: SleeperLeagueMatchup) => {
                    pointsForList.push(
                        matchup.away.totalPoints,
                        matchup.home.totalPoints
                    );
                });

                let cleanedPointsForList: number[] = pointsForList.map(
                    (item: { $numberDecimal: string }) =>
                        parseFloat(item['$numberDecimal'])
                );

                cleanedPointsForList = cleanedPointsForList.sort(
                    (a: number, b: number) => {
                        if (a < b) return 1;
                        if (a > b) return -1;
                        return 0;
                    }
                );

                const isEvenTeams = selectedLeague.teams.length % 2 === 0;

                if (isEvenTeams) {
                    const score1 =
                        cleanedPointsForList[cleanedPointsForList.length / 2];
                    const score2 =
                        cleanedPointsForList[
                            cleanedPointsForList.length / 2 - 1
                        ];
                    const median = (score1 + score2) / 2;

                    medianForWeek = median;
                } else {
                    medianForWeek =
                        cleanedPointsForList[cleanedPointsForList.length / 2];
                }

                medianForWeekMap.set(week, medianForWeek);
            }
        );

        return medianForWeekMap;
    };

    const createTeamGTMs = (
        team1MatchupsMap: Map<string, Matchup>,
        team2MatchupsMap: Map<string, Matchup>,
        medianScoringMap?: Map<string, number> | undefined
    ): GTMResult => {
        const teamGTMResults: GTMResult = {
            wins: 0,
            losses: 0,
            ties: 0,
            matchups: [] as SleeperLeagueMatchup[],
        };

        for (let [week, team2Matchup] of team2MatchupsMap) {
            const teamMatchup: Matchup = team1MatchupsMap.get(week)!;
            const teamGTM = {
                matchupId: parseInt(week),
                matchupWeek: parseInt(week),
                winner: '',
                away: {
                    teamId: teamMatchup.self.teamId,
                    totalPoints: parseFloat(
                        teamMatchup.self.totalPoints['$numberDecimal']
                    ),
                },
                home: {
                    // get the opposing team unless the opposing team is itself.
                    teamId:
                        team2Matchup.opponent.teamId === teamMatchup.self.teamId
                            ? team2Matchup.self.teamId
                            : team2Matchup.opponent.teamId,
                    totalPoints:
                        team2Matchup.opponent.teamId === teamMatchup.self.teamId
                            ? parseFloat(
                                  team2Matchup.self.totalPoints[
                                      '$numberDecimal'
                                  ]
                              )
                            : parseFloat(
                                  team2Matchup.opponent.totalPoints[
                                      '$numberDecimal'
                                  ]
                              ),
                },
            } as SleeperLeagueMatchup;

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

            if (medianScoringMap?.size) {
                const medianForWeek = medianScoringMap.get(week)!;

                if (teamGTM.away.totalPoints > medianForWeek) {
                    teamGTMResults.wins++;
                } else if (teamGTM.away.totalPoints < medianForWeek) {
                    teamGTMResults.losses++;
                } else {
                    teamGTMResults.ties++;
                }
            }

            teamGTMResults.matchups.push(teamGTM);
        }

        return teamGTMResults;
    };

    const combineGTMResults = (
        team1GTMResults: GTMResult,
        team2GTMResults: GTMResult
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
        if (selectedLeague?.leagueId && team1 && team2) {
            let medianScoringMap: Map<string, number> | undefined;

            const team1MatchupsMap = createTeamMatchupsMap(
                selectedLeague.matchups,
                team1
            );
            const team2MatchupsMap = createTeamMatchupsMap(
                selectedLeague.matchups,
                team2
            );

            // skill-based stuff
            if (selectedLeague.isSkillBased) {
                medianScoringMap = createMedianScoringMap(selectedLeague);
            }

            const team1GTMResults: GTMResult = createTeamGTMs(
                team1MatchupsMap,
                team2MatchupsMap,
                medianScoringMap
            );
            const team2GTMResults: GTMResult = createTeamGTMs(
                team2MatchupsMap,
                team1MatchupsMap,
                medianScoringMap
            );

            const combinedGTMResults = combineGTMResults(
                team1GTMResults,
                team2GTMResults
            );

            setTeam1GTMResults(team1GTMResults);
            setTeam2GTMResults(team2GTMResults);
            setCombinedGTMResults(combinedGTMResults);
        }
    }, [selectedLeague?.leagueId, team1.teamId, team2.teamId]);

    return { team1GTMResults, team2GTMResults, combinedGTMResults };
};
