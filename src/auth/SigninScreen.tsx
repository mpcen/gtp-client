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
import { signIn, clearErrors } from './store/actionCreators';
import { RootState } from '../store/rootReducer';
import { TouchableOpacity } from 'react-native-gesture-handler';

export const SigninScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
                    {Constants.SigninTitle}
                </Text>
            </View>

            <View style={styles.formContainer}>
                <Input
                    testID='input-email'
                    placeholder={Constants.EmailPlaceholder}
                    value={email}
                    disabled={isLoading}
                    onChangeText={setEmail}
                />
                <Input
                    testID='input-password'
                    secureTextEntry
                    placeholder={Constants.PasswordPlaceholder}
                    value={password}
                    disabled={isLoading}
                    onChangeText={setPassword}
                    errorMessage={error.length ? error : ''}
                />

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
        fontSize: 40,
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
