import React, { useState, useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
} from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import * as Constants from './constants';
import { resetPasswordRequest, clearErrors } from './store/actionCreators';
import { RootState } from '../store/rootReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';

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
            <View style={styles.backButtonContainer}>
                <TouchableOpacity onPress={() => navigate('AuthHome')}>
                    <Icon
                        iconStyle={styles.iconStyle}
                        name='chevron-left'
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
                    testID='input-email'
                    placeholder={Constants.EmailPlaceholder}
                    value={email}
                    disabled={isLoading}
                    errorMessage={error}
                    onChangeText={setEmail}
                />

                <Button
                    containerStyle={styles.buttonContainer}
                    testID='button-sign-in'
                    title={Constants.ResetPasswordButtonText}
                    disabled={isLoading}
                    onPress={() => dispatch(resetPasswordRequest(email))}
                />

                {!error && !isLoading && resetPassword.fullUrl ? (
                    <View
                        style={{
                            justifyContent: 'center',
                            alignContent: 'center',
                            marginTop: 8,
                        }}
                    >
                        <Text style={{ color: '#2089dc', textAlign: 'center' }}>
                            Reset instructions were sent to the email provided
                        </Text>
                    </View>
                ) : null}
            </View>

            <View style={styles.loadingContainer}>
                {isLoading && <ActivityIndicator testID='indicator-loading' />}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    formContainer: {
        flex: 1,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    backButtonContainer: {
        marginTop: 40,
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },
    iconStyle: { alignSelf: 'flex-start' },
    title: {
        fontSize: 32,
    },
    titleContainer: {
        flex: 1,
        width: '100%',
        marginLeft: 40,
        justifyContent: 'center',
        alignContent: 'flex-start',
    },
    buttonContainer: { width: '33%', alignSelf: 'center' },
    loadingContainer: { flex: 0.5, justifyContent: 'center' },
});
