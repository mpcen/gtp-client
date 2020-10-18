import React, { useState, useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    KeyboardAvoidingView,
    Platform,
} from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import * as Constants from './constants';
import { resetPasswordRequest, clearErrors } from './store/actionCreators';
import { RootState } from '../store/rootReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../common/styles/colors';

export const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const { navigate } = useNavigation();
    const { isLoading, error, resetPassword } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(clearErrors());
    }, []);

    return (
        <SafeAreaView style={styles.container}>
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.kbAvoidingView}
            >
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={() => navigate('AuthHome')}>
                        <Icon
                            iconStyle={styles.iconStyle}
                            name="chevron-left"
                            size={40}
                        />
                    </TouchableOpacity>
                </View>

                <View style={styles.titleContainer}>
                    <Text style={styles.title} allowFontScaling={false}>
                        {Constants.ForgotPasswordTitle}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    <Input
                        testID="input-email"
                        placeholder={Constants.EmailPlaceholder}
                        value={email}
                        disabled={isLoading}
                        errorMessage={error}
                        errorStyle={styles.errorMessageContainer}
                        onChangeText={setEmail}
                    />

                    <Button
                        containerStyle={styles.buttonContainer}
                        testID="button-sign-in"
                        title={Constants.ResetPasswordButtonText}
                        disabled={isLoading}
                        onPress={() => dispatch(resetPasswordRequest(email))}
                    />

                    {!error && !isLoading && resetPassword.fullUrl ? (
                        <View style={styles.resetMessageContainer}>
                            <Text style={styles.resetMessageText}>
                                Reset instructions were sent to the email
                                provided
                            </Text>
                        </View>
                    ) : null}
                </View>

                <View style={styles.loadingContainer}>
                    {isLoading && (
                        <ActivityIndicator testID="indicator-loading" />
                    )}
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    kbAvoidingView: { flex: 1 },
    formContainer: {
        flex: 1,
        width: '100%',
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    backButtonContainer: {
        paddingTop: 40,
        marginLeft: 4,
    },
    iconStyle: { alignSelf: 'flex-start' },
    title: {
        fontSize: 32,
    },
    titleContainer: {
        flex: 0.25,
        width: '100%',
        paddingLeft: 16,
        justifyContent: 'flex-end',
    },
    buttonContainer: { marginTop: 24, width: '33%', alignSelf: 'center' },
    loadingContainer: { flex: 0.5, justifyContent: 'center' },
    resetMessageContainer: {
        justifyContent: 'center',
        alignContent: 'center',
        marginTop: 8,
    },
    resetMessageText: { color: Color.SuccessGreen, textAlign: 'center' },
    errorMessageContainer: { textAlign: 'center', paddingTop: 4 },
});
