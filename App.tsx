import React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { Provider } from 'react-redux';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

import { store } from './src/store';
import { Navigator } from './src/Navigator';

export default () => {
    const [fontsLoaded] = useFonts({
        BebasNeue_400Regular,
    });

    if (!fontsLoaded) {
        return null;
    }

    return (
        <Provider store={store}>
            <View style={styles.container}>
                <StatusBar
                    barStyle={
                        Platform.OS === 'ios' ? 'dark-content' : 'default'
                    } // TODO: Prob need to adjust for dark/light modes
                />

                <Navigator />
            </View>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
