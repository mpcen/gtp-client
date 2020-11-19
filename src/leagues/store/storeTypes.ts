import { LeagueModule } from '../components/LeagueModule';

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

export type ESPNLeague = {
    leagueId: string;
    seasonId: string;
    leagueName: string;
    currentSeasonWeek: number;
    currentLeagueWeek: number;
    playoffWeekStart: number;
    lastRegularSeasonWeek: number;
    totalLeagueWeeks: number;
    members: ESPNLeagueMember[];
    teams: ESPNLeagueTeam[];
    matchups: ESPNLeagueMatchup[];
};

export type League = SleeperLeague | ESPNLeague;

export type ESPNLeagueMember = {
    id: string;
    displayName: string;
    isLeagueManager: boolean;
};

export type ESPNLeagueTeam = {
    id: number;
    nickname: string;
    location: string;
    abbrev: string;
    owners: string[];
};

export type ESPNLeagueMatchup = {
    matchupId: number;
    matchupWeek: number;
    winner: string;
    away: {
        teamId: number;
        totalPoints: string;
    };
    home: {
        teamId: number;
        totalPoints: string;
    };
};

export type UserLeagues = {
    sleeper: SleeperLeague[];
    espn: ESPNLeague[];
};

export type LeagueState = {
    importSleeperLeagues: {
        leagues: ImportedSleeperLeague[];
    };
    espnLeagueExternal: ESPNLeagueExternal | null;
    userLeagues: UserLeagues;
    isLoading: boolean;
    error: string;
};

export type ESPNLeagueExternal = {
    id: number;
    seasonId: number;
    settings: { name: string };
    teams: { id: number }[];
};
