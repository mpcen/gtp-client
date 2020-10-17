import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { preloadData } from './store/actionCreators';

export const PreloadingDataScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(preloadData());
    }, []);

    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
