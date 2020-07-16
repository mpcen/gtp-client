import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';

import { SigninScreen } from './auth/SigninScreen';
import { SignupScreen } from './auth/SignupScreen';
import { HomeScreen } from './home/HomeScreen';
import { RootState } from './store/rootReducer';
import { resolveAuth } from './auth/store/actionCreators';

const AuthStack = createStackNavigator();
const Tabs = createBottomTabNavigator();

export const Navigation = () => {
    const { token } = useSelector((state: RootState) => state.auth);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(resolveAuth());
    }, []);

    return (
        <NavigationContainer>
            {token ? (
                <Tabs.Navigator>
                    <Tabs.Screen name='Home' component={HomeScreen} />
                </Tabs.Navigator>
            ) : (
                <AuthStack.Navigator>
                    <AuthStack.Screen
                        name='Signup'
                        component={SignupScreen}
                        options={{ headerShown: false }}
                    />
                    <AuthStack.Screen
                        name='Signin'
                        component={SigninScreen}
                        options={{ headerShown: false }}
                    />
                </AuthStack.Navigator>
            )}
        </NavigationContainer>
    );
};
