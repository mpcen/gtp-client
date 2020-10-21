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
import { Color } from '../common/styles/colors';

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

                {/* SIGN UP TITLE */}
                <View style={styles.titleContainer}>
                    <Text style={styles.title} allowFontScaling={false}>
                        {Constants.SignupTitle}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    {/* EMAIL */}
                    <Input
                        placeholder={Constants.EmailPlaceholder}
                        disabled={isLoading}
                        // inputStyle={styles.inputStyle}
                        value={email}
                        onChangeText={setEmail}
                    />

                    {/* PASSWORD */}
                    <View style={styles.passwordContainer}>
                        <Input
                            testID="input-password"
                            textContentType="oneTimeCode"
                            // inputStyle={styles.inputStyle}
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
                            textContentType="oneTimeCode"
                            // inputStyle={styles.inputStyle}
                            disabled={isLoading}
                            secureTextEntry={!isPasswordVisible}
                            placeholder={Constants.PasswordConfirmedPlaceholder}
                            errorMessage={error.length ? error : ''}
                            errorStyle={styles.errorMessageContainer}
                            value={confirmedPassword}
                            onChangeText={setConfirmedPassword}
                        />
                        <PasswordVisibilityIcon
                            isPasswordVisible={isPasswordVisible}
                            setIsPasswordVisible={setIsPasswordVisible}
                        />
                    </View>

                    {/* SIGN UP BUTTON */}
                    <Button
                        title={Constants.SignUpButtonText}
                        containerStyle={styles.buttonContainer}
                        titleStyle={styles.signupbuttonTitleStyle}
                        buttonStyle={styles.signupButton}
                        disabled={isLoading}
                        onPress={() =>
                            dispatch(signUp(email, password, confirmedPassword))
                        }
                    />

                    {/* SPINNER */}
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
    container: { flex: 1, backgroundColor: Color.PureWhite },
    kbAvoidingView: { flex: 1 },
    backButtonContainer: {
        marginLeft: 4,
    },
    iconStyle: { alignSelf: 'flex-start' },
    titleContainer: {
        flex: 0.25,
        width: '100%',
        paddingLeft: 16,
        justifyContent: 'flex-end',
    },
    title: {
        fontFamily: 'BebasNeue_400Regular',
        fontSize: 40,
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
    buttonContainer: { paddingTop: 24, width: 120, alignSelf: 'center' },
    loadingContainer: { flex: 0.5, justifyContent: 'center' },
    errorMessageContainer: {
        textAlign: 'center',
        paddingTop: 4,
        fontFamily: 'BebasNeue_400Regular',
    },
    signupButton: { backgroundColor: Color.MainBlack },
    signupbuttonTitleStyle: {
        fontFamily: 'BebasNeue_400Regular',
    },
    inputStyle: { fontFamily: 'BebasNeue_400Regular' },
});
