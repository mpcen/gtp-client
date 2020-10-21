import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import {
    SleeperLeague,
    SleeperLeagueTeam,
} from '../../../leagues/store/storeTypes';
import { OverlayTypes } from '../../types';
import { MemberMap } from '../../hooks/useMemberMap';

type Props = {
    selectedLeague: SleeperLeague;
    team1: SleeperLeagueTeam;
    team2: SleeperLeagueTeam;
    soloTeam: SleeperLeagueTeam;
    selectedTeam: number;
    memberMap: MemberMap;
    isH2H: boolean;
    setTeam1: React.Dispatch<React.SetStateAction<SleeperLeagueTeam>>;
    setTeam2: React.Dispatch<React.SetStateAction<SleeperLeagueTeam>>;
    setSoloTeam: React.Dispatch<React.SetStateAction<SleeperLeagueTeam>>;
    setOverlay: React.Dispatch<React.SetStateAction<OverlayTypes>>;
};

export const GarbageTimeTeamSelectList = ({
    selectedLeague,
    team1,
    team2,
    soloTeam,
    selectedTeam,
    memberMap,
    isH2H,
    setTeam1,
    setTeam2,
    setSoloTeam,
    setOverlay,
}: Props) => {
    const teamList = isH2H
        ? selectedLeague.teams.filter(
              (team: SleeperLeagueTeam) =>
                  team.teamId !== team1.teamId && team.teamId !== team2.teamId
          )
        : selectedLeague.teams.filter(
              (team) => team.teamId !== soloTeam.teamId
          );

    return (
        <FlatList
            data={teamList}
            keyExtractor={(item) => item.teamId}
            renderItem={({ item }: { item: SleeperLeagueTeam }) => (
                <ListItem
                    key={item.teamId}
                    bottomDivider
                    leftAvatar={{
                        source: {
                            uri: `https://sleepercdn.com/avatars/thumbs/${
                                memberMap[item.ownerIds[0]]?.avatar
                            }`,
                        },
                    }}
                    title={
                        item.nickname ||
                        selectedLeague.members.find(
                            (member) => member.memberId === item.ownerIds[0]
                        )?.displayName
                    }
                    onPress={() => {
                        if (isH2H) {
                            if (selectedTeam === 1) {
                                setTeam1(item);
                            } else {
                                setTeam2(item);
                            }
                        } else {
                            setSoloTeam(item);
                        }

                        setOverlay(OverlayTypes.None);
                    }}
                />
            )}
        />
    );
};
