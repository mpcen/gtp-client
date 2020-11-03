import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { ForgotPasswordScreen } from '../../auth/ForgotPasswordScreen';
import { SigninScreen } from '../../auth/SigninScreen';
import { SignupScreen } from '../../auth/SignupScreen';
import { AuthHomeScreen } from '../../auth/AuthHomeScreen';

const AuthStack = createStackNavigator();

export const AuthStackNavigator = () => {
    return (
        <NavigationContainer>
            <AuthStack.Navigator>
                <AuthStack.Screen
                    name="AuthHome"
                    component={AuthHomeScreen}
                    options={{ headerShown: false }}
                />
                <AuthStack.Screen
                    name="Signup"
                    component={SignupScreen}
                    options={{ headerShown: false }}
                />
                <AuthStack.Screen
                    name="Signin"
                    component={SigninScreen}
                    options={{ headerShown: false }}
                />
                <AuthStack.Screen
                    name="ForgotPassword"
                    component={ForgotPasswordScreen}
                    options={{ headerShown: false }}
                />
            </AuthStack.Navigator>
        </NavigationContainer>
    );
};
