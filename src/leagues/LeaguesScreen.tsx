import React, { useEffect } from 'react';
import { View, FlatList } from 'react-native';
import { Button, ListItem } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import { SleeperLeague } from './store/storeTypes';
import {
    addSleeperLeague,
    storePreloadedLeagues,
} from './store/actionCreators';

export const LeaguesScreen = () => {
    const dispatch = useDispatch();
    const { navigate } = useNavigation();
    const { leagues, auth } = useSelector((state: RootState) => state);

    useEffect(() => {
        if (auth.isDataPreloaded) {
            dispatch(storePreloadedLeagues(auth.preloadedLeagues.sleeper));
        }
    }, [auth.isDataPreloaded]);

    return (
        <View>
            <FlatList
                data={leagues.userLeagues.sleeper}
                keyExtractor={(item) => item.leagueId}
                renderItem={({ item }) => (
                    <ListItem
                        key={item.leagueId}
                        title={item.leagueName}
                        subtitle={`Season: ${item.seasonId} Teams: ${item.teams.length}`}
                        onPress={() => {}}
                        topDivider
                        bottomDivider
                        chevron
                    />
                )}
            />

            <Button
                title='Import Sleeper League'
                onPress={() => navigate('ImportSleeperLeagues')}
            />
        </View>
    );
};
