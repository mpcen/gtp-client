import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import {
    SleeperLeague,
    SleeperLeagueMember,
    SleeperLeagueTeam,
} from '../../leagues/store/storeTypes';
import { CombinedGTMResult } from '../hooks/useGarbageTimeMatchups';
import { GarbageTimeMatchupsListItem } from './GarbageTimeMatchupsListItem';

export type Props = {
    selectedLeague: SleeperLeague;
    combinedGTMResults: CombinedGTMResult[];
};

export type TeamInfoMap = {
    [key: string]: SleeperLeagueMember;
};

export const GarbageTimeMatchupsList = ({
    selectedLeague,
    combinedGTMResults,
}: Props) => {
    const [teamInfoMap, setTeamInfoMap] = useState({} as TeamInfoMap);

    useEffect(() => {
        const teamInfoMap = {} as TeamInfoMap;

        selectedLeague.teams.forEach((team: SleeperLeagueTeam) => {
            const member = selectedLeague.members.find(
                (member) => member.memberId === team.ownerIds[0]
            )!;
            teamInfoMap[team.teamId] = member;
        });

        setTeamInfoMap(teamInfoMap);
    }, [selectedLeague.leagueId]);

    return (
        <FlatList
            style={{ marginLeft: 8, marginRight: 8 }}
            data={combinedGTMResults}
            keyExtractor={(item) => item.t1.matchupWeek.toString()}
            renderItem={({ item }: { item: CombinedGTMResult }) => (
                <GarbageTimeMatchupsListItem
                    combinedGTMResult={item}
                    teamInfoMap={teamInfoMap}
                />
            )}
        />
    );
};
