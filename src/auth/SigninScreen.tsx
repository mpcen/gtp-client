import React, { useState, useEffect } from 'react';
import {
    View,
    ActivityIndicator,
    StyleSheet,
    SafeAreaView,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    TextInput,
} from 'react-native';
import { Input, Button, Text, Icon } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import * as Constants from './constants';
import { signIn, clearErrors } from './store/actionCreators';
import { RootState } from '../store/rootReducer';

import { PasswordVisibilityIcon } from './components/PasswordVisibilityIcon';

export const SigninScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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

                <View style={styles.titleContainer}>
                    <Text style={styles.title} allowFontScaling={false}>
                        {Constants.SigninTitle}
                    </Text>
                </View>

                <View style={styles.formContainer}>
                    {/* EMAIL */}
                    <Input
                        testID="input-email"
                        placeholder={Constants.EmailPlaceholder}
                        value={email}
                        disabled={isLoading}
                        onChangeText={setEmail}
                    />

                    {/* PASSWORD */}
                    <View style={styles.passwordContainer}>
                        <Input
                            secureTextEntry={!isPasswordVisible}
                            placeholder={Constants.PasswordPlaceholder}
                            value={password}
                            disabled={isLoading}
                            onChangeText={setPassword}
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
                        testID="button-sign-in"
                        title={Constants.SignInButtonText}
                        disabled={isLoading}
                        onPress={() => dispatch(signIn(email, password))}
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
    container: {
        flex: 1,
    },
    kbAvoidingView: { flex: 1 },
    backButtonContainer: {
        paddingTop: 40,
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
    buttonContainer: { marginTop: 24, width: '33%', alignSelf: 'center' },
    loadingContainer: { flex: 0.5, justifyContent: 'center' },
    errorMessageContainer: { textAlign: 'center', paddingTop: 4 },
});
