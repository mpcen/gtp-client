import React from 'react';
import { View } from 'react-native';
import { Button } from 'react-native-elements';
import { useDispatch } from 'react-redux';

import { signOut } from '../auth/store/actionCreators';

export const AccountScreen = () => {
    const dispatch = useDispatch();

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Button title='Sign out' onPress={() => dispatch(signOut())} />
        </View>
    );
};
