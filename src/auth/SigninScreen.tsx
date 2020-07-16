import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator } from 'react-native';
import { Input, Button, Text } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';

import { signIn, clearErrors } from './store/actionCreators';
import { RootState } from '../store/rootReducer';

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
        <View
            style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
        >
            <Input
                testID='input-email'
                placeholder='Email'
                value={email}
                disabled={isLoading}
                onChangeText={setEmail}
            />
            <Input
                testID='input-password'
                secureTextEntry
                placeholder='Password'
                value={password}
                disabled={isLoading}
                onChangeText={setPassword}
            />
            <Button
                testID='button-sign-in'
                title='Sign In'
                disabled={isLoading}
                onPress={() => dispatch(signIn(email, password))}
            />

            <Button
                testID='button-sign-up-instead'
                type='clear'
                title='Sign up instead'
                disabled={isLoading}
                onPress={() => navigate('Signup')}
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
