import React, { useEffect } from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { useDispatch } from 'react-redux';

import { resolveAuth } from './store/actionCreators';

export const ResolvingAuthScreen = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resolveAuth());
    }, []);

    return (
        <View style={styles.container}>
            <Image
                style={styles.imageContainer}
                source={require('../../assets/splash.png')}
            />

            <ActivityIndicator size="large" />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    imageContainer: { height: 400, width: 300 },
});
