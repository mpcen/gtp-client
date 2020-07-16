import React from 'react';
import { View, Text } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { signOut } from '../auth/store/actionCreators';

export const HomeScreen = () => {
    const dispatch = useDispatch();

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Text>HomeScreen</Text>

            <Button title='Sign out' onPress={() => dispatch(signOut())} />
        </View>
    );
};
