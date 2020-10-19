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

import * as StringConstants from './constants';
import { resetPasswordRequest, clearErrors } from './store/actionCreators';
import { RootState } from '../store/rootReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Color } from '../common/styles/colors';

export const ForgotPasswordScreen = () => {
    const { navigate } = useNavigation();
    const [email, setEmail] = useState('');
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
                {/* BACK BUTTON */}
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={() => navigate('AuthHome')}>
                        <Icon
                            iconStyle={styles.iconStyle}
                            name="chevron-left"
                            size={40}
                        />
                    </TouchableOpacity>
                </View>

                {/* RESET PASSWORD TITLE */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title} allowFontScaling={false}>
                        {StringConstants.ForgotPasswordTitle}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    {/* EMAIL */}
                    <Input
                        inputStyle={styles.inputStyle}
                        placeholder={StringConstants.EmailPlaceholder}
                        value={email}
                        disabled={isLoading}
                        errorMessage={error}
                        errorStyle={styles.errorMessageContainer}
                        onChangeText={setEmail}
                    />

                    {/* BUTTON */}
                    <Button
                        title={StringConstants.ResetPasswordButtonText}
                        containerStyle={styles.buttonContainer}
                        titleStyle={styles.resetButtonTitleStyle}
                        buttonStyle={styles.signupButton}
                        disabled={isLoading}
                        onPress={() => dispatch(resetPasswordRequest(email))}
                    />

                    {!error && !isLoading && resetPassword.fullUrl ? (
                        <View style={styles.resetMessageContainer}>
                            <Text style={styles.resetMessageText}>
                                {StringConstants.ResetPasswordSuccessText}
                            </Text>
                        </View>
                    ) : null}

                    <View style={styles.loadingContainer}>
                        {isLoading && (
                            <ActivityIndicator testID="indicator-loading" />
                        )}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Color.PureWhite,
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
        marginLeft: 4,
    },
    iconStyle: { alignSelf: 'flex-start' },
    title: {
        fontFamily: 'BebasNeue_400Regular',
        fontSize: 40,
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
    resetMessageText: {
        color: Color.SuccessGreen,
        textAlign: 'center',
        fontFamily: 'BebasNeue_400Regular',
    },
    errorMessageContainer: {
        textAlign: 'center',
        paddingTop: 4,
        fontFamily: 'BebasNeue_400Regular',
    },
    inputStyle: { fontFamily: 'BebasNeue_400Regular' },
    resetButtonTitleStyle: {
        fontFamily: 'BebasNeue_400Regular',
    },
    signupButton: { backgroundColor: Color.MainBlack },
});
