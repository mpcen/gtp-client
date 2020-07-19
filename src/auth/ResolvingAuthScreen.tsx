import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';

import { resolveAuth } from './store/actionCreators';

export const ResolvingAuthScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resolveAuth());
    }, []);

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ActivityIndicator size='large' />
        </View>
    );
};
