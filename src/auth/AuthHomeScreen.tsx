import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useFonts, BebasNeue_400Regular } from '@expo-google-fonts/bebas-neue';

import * as StringConstants from './constants';
import { Color } from '../common/styles/colors';

export const AuthHomeScreen = () => {
    const [fontsLoaded] = useFonts({
        BebasNeue_400Regular,
    });
    const { navigate } = useNavigation();

    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.appTitle} allowFontScaling={false}>
                {StringConstants.AppTitle}
            </Text>

            <Button
                containerStyle={styles.buttonContainer}
                title="Sign up"
                onPress={() => navigate('Signup')}
            />

            <Button
                containerStyle={styles.signupButtonContainerStyle}
                type="outline"
                title="Sign in"
                onPress={() => navigate('Signin')}
            />

            <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigate('ForgotPassword')}
            >
                <Text style={styles.forgotPasswordText}>
                    {StringConstants.ForgotPassword}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
    },
    appTitle: {
        fontSize: 40,
        marginBottom: 50,
        fontFamily: 'BebasNeue_400Regular',
    },
    signupButtonContainerStyle: { marginBottom: 8, width: 120 },
    forgotPassword: { marginTop: 8 },
    forgotPasswordText: { color: Color.ActiveBlue },
    buttonContainer: { marginBottom: 8, width: 120 },
});
