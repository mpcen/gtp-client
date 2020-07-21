import { useState, useEffect } from 'react';

import {
    SleeperLeagueTeam,
    SleeperLeagueMatchup,
    SleeperLeague,
} from '../leagues/store/storeTypes';

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

export const useGarbageTimeMatchups = (
    selectedLeague: SleeperLeague,
    team1: SleeperLeagueTeam,
    team2: SleeperLeagueTeam
): { team1GTMs: SleeperLeagueMatchup[]; team2GTMs: SleeperLeagueMatchup[] } => {
    const [team1GTMs, setTeam1GTMs] = useState([] as SleeperLeagueMatchup[]);
    const [team2GTMs, setTeam2GTMs] = useState([] as SleeperLeagueMatchup[]);

    const createTeamMatchupsMap = (
        matchups: SleeperLeagueMatchup[],
        team: SleeperLeagueTeam
    ): Map<string, Matchup> => {
        const teamMatchupsMap = new Map<string, Matchup>();

        matchups
            .filter(
                (matchup: SleeperLeagueMatchup) =>
                    (matchup.away.teamId.toString() === team.teamId ||
                        matchup.home.teamId.toString() === team.teamId) &&
                    matchup.matchupWeek <= selectedLeague.lastRegularSeasonWeek
            )
            .forEach((matchup) => {
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

    const createTeamGTMs = (
        team1MatchupsMap: Map<string, Matchup>,
        team2MatchupsMap: Map<string, Matchup>
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

            teamGTMResults.matchups.push(teamGTM);
        }

        return teamGTMResults;
    };

    useEffect(() => {
        if (team1 && team2 && selectedLeague.matchups) {
            const team1MatchupsMap = createTeamMatchupsMap(
                selectedLeague.matchups,
                team1
            );
            const team2MatchupsMap = createTeamMatchupsMap(
                selectedLeague.matchups,
                team2
            );

            const team1GTMResults: GTMResult = createTeamGTMs(
                team1MatchupsMap,
                team2MatchupsMap
            );
            const team2GTMResults: GTMResult = createTeamGTMs(
                team2MatchupsMap,
                team1MatchupsMap
            );

            setTeam1GTMs(team1GTMResults.matchups);
            setTeam2GTMs(team2GTMResults.matchups);
        }
    }, [team1.teamId, team2.teamId]);

    return { team1GTMs, team2GTMs };
};
