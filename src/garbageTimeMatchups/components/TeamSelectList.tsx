import React from 'react';
import { FlatList } from 'react-native';
import { ListItem } from 'react-native-elements';

import {
    SleeperLeague,
    SleeperLeagueTeam,
} from '../../leagues/store/storeTypes';

type Props = {
    selectedLeague: SleeperLeague;
    team1: SleeperLeagueTeam;
    team2: SleeperLeagueTeam;
    selectedTeam: number;
    setTeam1: React.Dispatch<React.SetStateAction<SleeperLeagueTeam>>;
    setTeam2: React.Dispatch<React.SetStateAction<SleeperLeagueTeam>>;
    setIsOverlayVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

export const TeamSelectList = ({
    selectedLeague,
    team1,
    team2,
    selectedTeam,
    setTeam1,
    setTeam2,
    setIsOverlayVisible,
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

                        setIsOverlayVisible(false);
                    }}
                />
            )}
        />
    );
};
