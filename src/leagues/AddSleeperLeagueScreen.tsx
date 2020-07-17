import React, { useState } from 'react';
import { View, Text, ActivityIndicator } from 'react-native';
import { Input, Button } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';

import { RootState } from '../store/rootReducer';
import { findUser } from './store/actionCreators';

export const AddSleeperLeagueScreen = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const { addLeagueState, isLoading, error } = useSelector(
        (state: RootState) => state.leagues
    );

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Input
                placeholder='Enter Sleeper username'
                value={username}
                onChangeText={setUsername}
            />

            <Button
                title='Search'
                onPress={() => dispatch(findUser(username))}
            />

            {isLoading && <ActivityIndicator size='large' />}

            {error ? (
                <Text testID='text-error' style={{ color: 'red' }}>
                    {error}
                </Text>
            ) : null}

            {addLeagueState.username ? (
                <Button
                    type='outline'
                    title={addLeagueState.username}
                    onPress={() => {}}
                />
            ) : null}
        </View>
    );
};
