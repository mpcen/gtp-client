import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, ListItem } from 'react-native-elements';

import { RootState } from '../../../store/rootReducer';
import { findSleeperLeaguesForUser } from '../../store/actionCreators';

export const ImportSleeperLeaguesScreen = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const { importSleeperLeagues, isLoading, error } = useSelector(
        (state: RootState) => state.leagues
    );

    return (
        <View>
            <Input
                placeholder='Enter Sleeper username'
                value={username}
                onChangeText={setUsername}
            />

            <Button
                title='Search'
                onPress={() => dispatch(findSleeperLeaguesForUser(username))}
            />

            {isLoading && <ActivityIndicator size='large' />}

            {error ? (
                <Text testID='text-error' style={{ color: 'red' }}>
                    {error}
                </Text>
            ) : null}

            {importSleeperLeagues.leagues.map((league) => (
                <ListItem
                    style={{ marginTop: 20 }}
                    key={league.leagueId}
                    title={league.name}
                    subtitle={`Season: ${league.seasonId} Teams: ${league.totalTeams}`}
                    onPress={() => {}}
                    chevron
                    topDivider
                    bottomDivider
                />
            ))}
        </View>
    );
};
