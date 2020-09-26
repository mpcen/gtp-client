export type SleeperLeagueMember = {
    memberId: string;
    displayName: string;
    avatar: string;
    teamName: string;
};

export type SleeperLeagueTeam = {
    teamId: string;
    nickname: string;
    ownerIds: string[];
    wins: number;
    losses: number;
    ties: number;
    rank: number;
    totalPointsFor: any;
    totalPointsAgainst: any;
};

export type SleeperLeagueMatchup = {
    matchupId: number | null;
    matchupWeek: number;
    winner: string;
    away: {
        teamId: number;
        totalPoints: number;
    };
    home: {
        teamId: number;
        totalPoints: number;
    };
};

export type ImportedSleeperLeague = {
    leagueId: string;
    seasonId: string;
    name: string;
    avatar: string | null;
    totalTeams: number;
    added: undefined | boolean;
};

export type SleeperLeague = {
    leagueId: string;
    seasonId: string;
    leagueName: string;
    seasonType: string;
    isSkillBased: boolean;
    currentLeagueWeek: number;
    currentSeasonWeek: number;
    playoffWeekStart: number;
    lastRegularSeasonWeek: number; // manually calculate this for ESPN
    avatar: string;
    members: SleeperLeagueMember[];
    teams: SleeperLeagueTeam[];
    matchups: SleeperLeagueMatchup[];
};

export type UserLeagues = {
    sleeper: SleeperLeague[];
};

export type LeagueState = {
    importSleeperLeagues: {
        leagues: ImportedSleeperLeague[];
    };
    userLeagues: UserLeagues;
    isLoading: boolean;
    error: string;
};
