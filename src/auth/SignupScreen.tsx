import React, { useState, useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
} from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import * as Constants from './constants';
import { RootState } from '../store/rootReducer';
import { signUp, clearErrors } from './store/actionCreators';

export const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const { navigate } = useNavigation();
    const { isLoading, error } = useSelector((state: RootState) => state.auth);
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
                    {Constants.SignupTitle}
                </Text>
            </View>

            <View style={styles.formContainer}>
                <Input
                    testID='input-email'
                    placeholder={Constants.EmailPlaceholder}
                    disabled={isLoading}
                    value={email}
                    onChangeText={setEmail}
                />
                <Input
                    testID='input-password'
                    disabled={isLoading}
                    secureTextEntry
                    placeholder={Constants.PasswordPlaceholder}
                    value={password}
                    onChangeText={setPassword}
                />
                <Input
                    testID='input-confirm-password'
                    disabled={isLoading}
                    secureTextEntry
                    placeholder={Constants.PasswordConfirmedPlaceholder}
                    value={confirmedPassword}
                    onChangeText={setConfirmedPassword}
                    errorMessage={error.length ? error : ''}
                />
                <Button
                    testID='button-sign-up'
                    title={Constants.SignUpButtonText}
                    disabled={isLoading}
                    onPress={() =>
                        dispatch(signUp(email, password, confirmedPassword))
                    }
                />
            </View>

            <View style={styles.loadingContainer}>
                {isLoading && <ActivityIndicator testID='indicator-loading' />}
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, alignItems: 'center' },
    backButtonContainer: {
        marginTop: 40,
        width: '100%',
        justifyContent: 'flex-start',
        alignContent: 'flex-start',
    },
    iconStyle: { alignSelf: 'flex-start' },
    titleContainer: {
        flex: 1,
        width: '100%',
        marginLeft: 40,
        justifyContent: 'center',
        alignContent: 'flex-start',
    },
    title: {
        fontSize: 40,
    },
    formContainer: {
        flex: 1,
        width: '100%',
        paddingLeft: 20,
        paddingRight: 20,
    },
    loadingContainer: { flex: 0.5, justifyContent: 'center' },
});
