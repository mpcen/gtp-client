import React, { useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { preloadData } from './store/actionCreators';
import { RootState } from '../store/rootReducer';

export const PreloadingDataScreen = () => {
    const dispatch = useDispatch();
    const { auth } = useSelector((state: RootState) => state);

    useEffect(() => {
        dispatch(preloadData());
    }, []);

    return (
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <ActivityIndicator size='large' />
        </View>
    );
};
