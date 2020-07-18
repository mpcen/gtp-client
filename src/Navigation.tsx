import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useDispatch, useSelector } from 'react-redux';

import { SigninScreen } from './auth/SigninScreen';
import { SignupScreen } from './auth/SignupScreen';
import { LeaguesScreen } from './leagues/LeaguesScreen';
import { RootState } from './store/rootReducer';
import { resolveAuth } from './auth/store/actionCreators';
import { AccountScreen } from './account/AccountScreen';
import { ImportSleeperLeaguesScreen } from './leagues/importLeague/sleeper/ImportSleeperLeaguesScreen';

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
                    <Tabs.Screen
                        name='Leagues'
                        component={LeaguesStackScreen}
                    />
                    <Tabs.Screen name='Account' component={AccountScreen} />
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
