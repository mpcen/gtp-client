import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import {
    SleeperLeague,
    SleeperLeagueTeam,
} from '../../leagues/store/storeTypes';
import { OverlayTypes } from '../types';
import { MemberMap } from '../hooks/useMemberMap';

type Props = {
    selectedLeague: SleeperLeague;
    team1: SleeperLeagueTeam;
    team2: SleeperLeagueTeam;
    selectedTeam: number;
    memberMap: MemberMap;
    setTeam1: React.Dispatch<React.SetStateAction<SleeperLeagueTeam>>;
    setTeam2: React.Dispatch<React.SetStateAction<SleeperLeagueTeam>>;
    setOverlay: React.Dispatch<React.SetStateAction<OverlayTypes>>;
};

export const GarbageTimeTeamSelectList = ({
    selectedLeague,
    team1,
    team2,
    selectedTeam,
    memberMap,
    setTeam1,
    setTeam2,
    setOverlay,
}: Props) => {
    return (
        <FlatList
            data={selectedLeague.teams.filter(
                (team: SleeperLeagueTeam) =>
                    team.teamId !== team1.teamId && team.teamId !== team2.teamId
            )}
            keyExtractor={(item) => item.teamId}
            renderItem={({ item }: { item: SleeperLeagueTeam }) => (
                <ListItem
                    leftAvatar={{
                        source: {
                            uri: `https://sleepercdn.com/avatars/thumbs/${
                                memberMap[item.ownerIds[0]]?.avatar
                            }`,
                        },
                    }}
                    key={item.teamId}
                    title={
                        item.nickname ||
                        selectedLeague.members.find(
                            (member) => member.memberId === item.ownerIds[0]
                        )?.displayName
                    }
                    bottomDivider
                    onPress={() => {
                        if (selectedTeam === 1) {
                            setTeam1(item);
                        } else {
                            setTeam2(item);
                        }

                        setOverlay(OverlayTypes.None);
                    }}
                />
            )}
        />
    );
};
