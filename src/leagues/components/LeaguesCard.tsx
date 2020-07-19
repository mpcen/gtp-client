import React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { Divider, ListItem, Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';

import { SleeperLeague } from '../store/storeTypes';

type Props = {
    platform: string;
    leagues: SleeperLeague[];
};

export const LeaguesCard = ({ platform, leagues }: Props) => {
    const { navigate } = useNavigation();

    return (
        <View style={{ backgroundColor: 'white' }}>
            <View
                style={{
                    justifyContent: 'space-between',
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingLeft: 14,
                    paddingTop: 20,
                    paddingBottom: 20,
                    paddingRight: 20,
                }}
            >
                <Text style={{ fontSize: 18 }}>{platform} Leagues</Text>
                <Button
                    buttonStyle={{
                        padding: 0,
                    }}
                    type='clear'
                    icon={{ name: 'plus', type: 'material-community' }}
                    onPress={() => navigate('ImportSleeperLeagues')}
                />
            </View>

            <Divider />

            <FlatList
                data={leagues}
                keyExtractor={(item) => item.leagueId}
                renderItem={({ item }) => (
                    <ListItem
                        key={item.leagueId}
                        title={item.leagueName}
                        subtitle={`Season: ${item.seasonId} Teams: ${item.teams.length}`}
                        onPress={() => {}} // TODO: Remove League w/ confirmation
                    />
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({});
