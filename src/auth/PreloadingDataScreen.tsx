import React, { useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';
import { useDispatch } from 'react-redux';

import { preloadData } from './store/actionCreators';
import { Color } from '../common/styles/colors';

export const PreloadingDataScreen = () => {
    let [fontsLoaded] = useFonts({
        BebasNeue_400Regular,
    });
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(preloadData());
    }, []);

    if (!fontsLoaded) {
        return null;
    } else
        return (
            <View style={styles.container}>
                <Text style={styles.textStyle} allowFontScaling={false}>
                    GarbageTime.app
                </Text>

                <ActivityIndicator
                    size="large"
                    style={styles.loaderContainer}
                />
            </View>
        );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    loaderContainer: { marginTop: 64 },
    textStyle: {
        fontFamily: 'BebasNeue_400Regular',
        fontSize: 50,
        color: Color.MainBlack,
    },
});
