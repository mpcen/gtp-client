import React from 'react';
import { StyleSheet, StatusBar, SafeAreaView } from 'react-native';
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
            <SafeAreaView style={styles.container}>
                <StatusBar
                    barStyle="dark-content" // TODO: Prob need to adjust for dark/light modes
                />

                <Navigator />
            </SafeAreaView>
        </Provider>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
});
