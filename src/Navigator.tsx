import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';

import { SigninScreen } from './auth/SigninScreen';
import { SignupScreen } from './auth/SignupScreen';
import { LeaguesScreen } from './leagues/LeaguesScreen';
import { RootState } from './store/rootReducer';
import { AccountScreen } from './account/AccountScreen';
import { ImportSleeperLeaguesScreen } from './leagues/importLeague/sleeper/ImportSleeperLeaguesScreen';
import { ResolvingAuthScreen } from './auth/ResolvingAuthScreen';
import { PreloadingDataScreen } from './auth/PreloadingDataScreen';

const Tabs = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const LeaguesStack = createStackNavigator();

const LeaguesStackScreen = () => {
    return (
        <LeaguesStack.Navigator>
            <LeaguesStack.Screen name='Leagues' component={LeaguesScreen} />
            <LeaguesStack.Screen
                name='ImportSleeperLeagues'
                component={ImportSleeperLeaguesScreen}
            />
        </LeaguesStack.Navigator>
    );
};

export const Navigator = () => {
    const { token, isResolvingAuth, isDataPreloaded } = useSelector(
        (state: RootState) => state.auth
    );

    if (isResolvingAuth) {
        return (
            <NavigationContainer>
                <ResolvingAuthScreen />
            </NavigationContainer>
        );
    }

    if (token) {
        if (!isDataPreloaded) {
            return (
                <NavigationContainer>
                    <PreloadingDataScreen />
                </NavigationContainer>
            );
        }

        return (
            <NavigationContainer>
                <Tabs.Navigator>
                    <Tabs.Screen
                        name='Leagues'
                        component={LeaguesStackScreen}
                    />
                    <Tabs.Screen name='Account' component={AccountScreen} />
                </Tabs.Navigator>
            </NavigationContainer>
        );
    }

    return (
        <NavigationContainer>
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
        </NavigationContainer>
    );
};
