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
                    {Constants.SigninTitle}
                </Text>
            </View>

            <View style={styles.formContainer}>
                {/* EMAIL */}
                <Input
                    testID='input-email'
                    placeholder={Constants.EmailPlaceholder}
                    value={email}
                    disabled={isLoading}
                    onChangeText={setEmail}
                />

                {/* PASSWORD */}
                <View>
                    <Input
                        testID='input-password'
                        secureTextEntry={!isPasswordVisible}
                        placeholder={Constants.PasswordPlaceholder}
                        value={password}
                        disabled={isLoading}
                        onChangeText={setPassword}
                        errorMessage={error.length ? error : ''}
                    />
                    <PasswordVisibilityIcon
                        isPasswordVisible={isPasswordVisible}
                        setIsPasswordVisible={setIsPasswordVisible}
                    />
                </View>

                {/* BUTTON */}
                <Button
                    containerStyle={styles.buttonContainer}
                    testID='button-sign-in'
                    title={Constants.SignInButtonText}
                    disabled={isLoading}
                    onPress={() => dispatch(signIn(email, password))}
                />
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
        paddingLeft: 12,
        paddingRight: 12,
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
