import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native-gesture-handler';

import { AppTitle, ForgotPassword } from './constants';

export const AuthHomeScreen = () => {
    const { navigate } = useNavigation();

    return (
        <View style={styles.container}>
            <Text style={styles.appTitle} allowFontScaling={false}>
                {AppTitle}
            </Text>

            <Button
                containerStyle={{
                    marginBottom: 8,
                    width: 120,
                }}
                title='Sign up'
                onPress={() => navigate('Signup')}
            />

            <Button
                containerStyle={styles.signupButtonContainerStyle}
                type='outline'
                title='Sign in'
                onPress={() => navigate('Signin')}
            />

            <TouchableOpacity
                style={styles.forgotPassword}
                onPress={() => navigate('ForgotPassword')}
            >
                <Text style={styles.forgotPasswordText}>{ForgotPassword}</Text>
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
    appTitle: { fontSize: 24, marginBottom: 50 },
    signupButtonContainerStyle: { marginBottom: 8, width: 120 },
    forgotPassword: { marginTop: 8 },
    forgotPasswordText: { color: '#2089dc' },
});
