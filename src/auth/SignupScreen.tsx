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
import { PasswordVisibilityIcon } from './components/PasswordVisibilityIcon';

export const SignupScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmedPassword, setConfirmedPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);
    const { isLoading, error } = useSelector((state: RootState) => state.auth);
    const { navigate } = useNavigation();
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
                {/* EMAIL */}
                <Input
                    testID='input-email'
                    placeholder={Constants.EmailPlaceholder}
                    disabled={isLoading}
                    value={email}
                    onChangeText={setEmail}
                />

                {/* PASSWORD */}
                <View style={styles.passwordContainer}>
                    <Input
                        testID='input-password'
                        disabled={isLoading}
                        secureTextEntry={!isPasswordVisible}
                        placeholder={Constants.PasswordPlaceholder}
                        value={password}
                        onChangeText={setPassword}
                    />
                    <PasswordVisibilityIcon
                        isPasswordVisible={isPasswordVisible}
                        setIsPasswordVisible={setIsPasswordVisible}
                    />
                </View>

                {/* CONFIRM PASSWORD */}
                <View style={styles.passwordContainer}>
                    <Input
                        testID='input-confirm-password'
                        disabled={isLoading}
                        secureTextEntry={!isPasswordVisible}
                        placeholder={Constants.PasswordConfirmedPlaceholder}
                        value={confirmedPassword}
                        onChangeText={setConfirmedPassword}
                        errorMessage={error.length ? error : ''}
                        errorStyle={styles.errorMessageContainer}
                    />
                    <PasswordVisibilityIcon
                        isPasswordVisible={isPasswordVisible}
                        setIsPasswordVisible={setIsPasswordVisible}
                    />
                </View>

                {/* BUTTON */}
                <Button
                    containerStyle={styles.buttonContainer}
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
        fontSize: 32,
    },
    formContainer: {
        flex: 1,
        width: '100%',
        paddingLeft: 12,
        paddingRight: 12,
    },
    passwordContainer: { flexDirection: 'row', position: 'relative' },
    passwordVisibilityButton: {
        marginRight: 10,
        position: 'absolute',
        right: 0,
        top: 8,
        justifyContent: 'center',
    },
    buttonContainer: { marginTop: 24, width: '33%', alignSelf: 'center' },
    loadingContainer: { flex: 0.5, justifyContent: 'center' },
    errorMessageContainer: { textAlign: 'center', paddingTop: 4 },
});
