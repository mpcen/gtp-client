import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

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
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Input
                testID='input-email'
                placeholder='Email'
                disabled={isLoading}
                value={email}
                onChangeText={setEmail}
            />
            <Input
                testID='input-password'
                disabled={isLoading}
                secureTextEntry
                placeholder='Password'
                value={password}
                onChangeText={setPassword}
            />
            <Input
                testID='input-confirm-password'
                disabled={isLoading}
                secureTextEntry
                placeholder='Confirm password'
                value={confirmedPassword}
                onChangeText={setConfirmedPassword}
            />
            <Button
                testID='button-sign-up'
                title='Sign Up'
                disabled={isLoading}
                onPress={() =>
                    dispatch(signUp(email, password, confirmedPassword))
                }
            />

            <Button
                testID='button-sign-in-instead'
                type='clear'
                disabled={isLoading}
                title='Sign in instead'
                onPress={() => navigate('Signin')}
            />

            {isLoading && <ActivityIndicator testID='indicator-loading' />}

            {error ? (
                <Text testID='text-error' style={{ color: 'red' }}>
                    {error}
                </Text>
            ) : null}
        </View>
    );
};
