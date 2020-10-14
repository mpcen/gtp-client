import React, { useState, useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
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
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.kbAvoidingView}
            >
                <View style={styles.backButtonContainer}>
                    <TouchableOpacity onPress={() => navigate('AuthHome')}>
                        <Icon
                            iconStyle={styles.iconStyle}
                            name='chevron-left'
                            size={40}
                        />
                    </TouchableOpacity>
                </View>

                {/* TITLE */}
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
                            textContentType="oneTimeCode"
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
                            textContentType="oneTimeCode"
                            disabled={isLoading}
                            secureTextEntry={!isPasswordVisible}
                            placeholder={Constants.PasswordConfirmedPlaceholder}
                            value={confirmedPassword}
                            errorMessage={error.length ? error : ''}
                            errorStyle={styles.errorMessageContainer}
                            onChangeText={setConfirmedPassword}
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

                    <View style={styles.loadingContainer}>
                        {isLoading && <ActivityIndicator testID='indicator-loading' />}
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1 },
    kbAvoidingView: { flex: 1 },
    backButtonContainer: {
        paddingTop: 20,
        marginLeft: 4
    },
    iconStyle: { alignSelf: 'flex-start' },
    titleContainer: { 
        flex: 0.25,       
        width: '100%',
        paddingLeft: 16,
        justifyContent: 'flex-end'
    },
    title: {
        fontSize: 32,
    },
    formContainer: {
        flex: 1,
        width: '100%',
        paddingLeft: 8,
        paddingRight: 8,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    passwordContainer: { flexDirection: 'row', position: 'relative' },
    passwordVisibilityButton: {
        marginRight: 10,
        position: 'absolute',
        right: 0,
        top: 8,
        justifyContent: 'center',
    },
    buttonContainer: { paddingTop: 24, width: '33%', alignSelf: 'center' },
    loadingContainer: { flex: 0.5, justifyContent: 'center' },
    errorMessageContainer: { textAlign: 'center', paddingTop: 4 },
});
