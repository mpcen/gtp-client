import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Input, Button, ListItem } from 'react-native-elements';

import { RootState } from '../../../store/rootReducer';
import {
    findSleeperLeaguesForUser,
    addSleeperLeague,
    removeSleeperLeague,
} from '../../store/actionCreators';
import { ImportedSleeperLeague } from '../../store/storeTypes';

import { RemoveLeagueOverlay } from '../../components/RemoveLeagueOverlay';

export const ImportSleeperLeaguesScreen = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const { importSleeperLeagues, isLoading, error } = useSelector(
        (state: RootState) => state.leagues
    );
    const [isOverlayVisible, setIsOverlayVisible] = useState(false);
    const [selectedLeague, setSelectedLeague] = useState(
        {} as ImportedSleeperLeague
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
                disabled={isLoading}
                onPress={() => dispatch(findSleeperLeaguesForUser(username))}
            />

            {isLoading && <ActivityIndicator size='large' />}

            {error ? (
                <Text testID='text-error' style={{ color: 'red' }}>
                    {error}
                </Text>
            ) : null}

            {importSleeperLeagues.leagues.map(
                (importSleeperLeague: ImportedSleeperLeague) => {
                    return (
                        <ListItem
                            style={{ marginTop: 20 }}
                            key={importSleeperLeague.leagueId}
                            title={importSleeperLeague.name}
                            subtitle={`Season: ${importSleeperLeague.seasonId} Teams: ${importSleeperLeague.totalTeams}`}
                            onPress={() => {
                                if (importSleeperLeague.added) {
                                    setIsOverlayVisible(true);
                                    setSelectedLeague(importSleeperLeague);
                                } else {
                                    dispatch(
                                        addSleeperLeague(
                                            importSleeperLeague.leagueId
                                        )
                                    );
                                }
                            }}
                            topDivider
                            bottomDivider
                            rightIcon={{
                                name: importSleeperLeague.added
                                    ? 'minus'
                                    : 'plus',
                                type: 'material-community',
                            }}
                        />
                    );
                }
            )}

            <RemoveLeagueOverlay
                selectedLeague={{
                    leagueId: selectedLeague.leagueId,
                    leagueName: selectedLeague.name,
                }}
                isOverlayVisible={isOverlayVisible}
                removeSleeperLeague={removeSleeperLeague}
                setIsOverlayVisible={setIsOverlayVisible}
            />
        </View>
    );
};
