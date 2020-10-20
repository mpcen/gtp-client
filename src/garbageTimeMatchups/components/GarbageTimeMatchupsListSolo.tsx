import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { SleeperLeague } from '../../leagues/store/storeTypes';

import { SoloGTMResult } from '../hooks/useGarbageTimeMatchups';

type Props = {
    soloGTMResults: SoloGTMResult[];
    league: SleeperLeague;
};

export const GarbageTimeMatchupsListSolo = ({
    soloGTMResults,
    league,
}: Props) => {
    return (
        <FlatList
            keyExtractor={(item, index) => index.toString()}
            data={soloGTMResults}
            renderItem={({ item }: { item: SoloGTMResult }) => {
                return (
                    <View style={{ flexDirection: 'row' }}>
                        <Text>
                            {item.opponent.nickname ||
                                league.members.find(
                                    (member) =>
                                        member.memberId ===
                                        item.opponent.ownerIds[0]
                                )?.displayName}
                        </Text>

                        <Text>
                            {' '}
                            - {`${item.wins}-${item.losses}-${item.ties}`}
                        </Text>
                    </View>
                );
            }}
        />
    );
};
