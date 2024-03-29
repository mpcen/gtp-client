import React from 'react';
import { Text, StyleSheet, SafeAreaView } from 'react-native';
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
        <SafeAreaView style={styles.container}>
            {/* TITLE */}
            <Text style={styles.appTitle} allowFontScaling={false}>
                {StringConstants.AppTitle}
            </Text>

            {/* SIGN UP */}
            <Button
                title="Sign up"
                containerStyle={styles.buttonContainer}
                buttonStyle={styles.signupButton}
                titleStyle={styles.signupTitle}
                onPress={() => navigate('Signup')}
            />

            {/* SIGN IN */}
            <Button
                title="Sign in"
                type="outline"
                containerStyle={styles.signupButtonContainerStyle}
                buttonStyle={styles.signinButton}
                titleStyle={styles.signinTitle}
                onPress={() => navigate('Signin')}
            />

            {/* FORGOT PASSWORD */}
            <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigate('ForgotPassword')}
            >
                <Text style={styles.forgotPasswordText}>
                    {StringConstants.ForgotPassword}
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: Color.PureWhite,
    },
    appTitle: {
        fontSize: 40,
        marginBottom: 50,
        fontFamily: 'BebasNeue_400Regular',
    },
    signupButtonContainerStyle: { marginBottom: 8, width: 120 },
    forgotPassword: { marginTop: 8 },
    forgotPasswordText: {
        color: Color.MainBlack,
        fontFamily: 'BebasNeue_400Regular',
    },
    buttonContainer: { marginBottom: 8, width: 120 },
    signupTitle: {
        color: Color.PureWhite,
        fontFamily: 'BebasNeue_400Regular',
        fontSize: 20,
    },
    signinTitle: {
        color: Color.MainBlack,
        fontFamily: 'BebasNeue_400Regular',
        fontSize: 20,
    },
    signupButton: { backgroundColor: Color.MainBlack },
    signinButton: { borderColor: Color.MainBlack },
});
