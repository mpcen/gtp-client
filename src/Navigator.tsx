import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { SigninScreen } from './auth/SigninScreen';
import { SignupScreen } from './auth/SignupScreen';
import { LeaguesScreen } from './leagues/LeaguesScreen';
import { RootState } from './store/rootReducer';
import { AccountScreen } from './account/AccountScreen';
import { ImportSleeperLeaguesScreen } from './leagues/importLeague/sleeper/ImportSleeperLeaguesScreen';
import { ResolvingAuthScreen } from './auth/ResolvingAuthScreen';
import { PreloadingDataScreen } from './auth/PreloadingDataScreen';
import { GarbageTimeMatchupsScreen } from './garbageTimeMatchups/GarbageTimeMatchupsScreen';

export type LeaguesStackParamList = {
    Leagues: undefined;
    ImportSleeperLeagues: undefined;
    LeagueHome: { leagueId: string };
};

const Tabs = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const LeaguesStack = createStackNavigator<LeaguesStackParamList>();
const GarbageTimeMatchupsStack = createStackNavigator();

const GarbageTimeMatchupsStackScreen = () => {
    return (
        <GarbageTimeMatchupsStack.Navigator>
            <GarbageTimeMatchupsStack.Screen
                name='GarbageTimeMatchups'
                component={GarbageTimeMatchupsScreen}
            />
        </GarbageTimeMatchupsStack.Navigator>
    );
};

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
                <Tabs.Navigator
                    tabBarOptions={{
                        showLabel: false,
                        activeTintColor: '#2089dc',
                        inactiveTintColor: '#adadad',
                    }}
                >
                    <Tabs.Screen
                        name='Leagues'
                        component={LeaguesStackScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='football-helmet'
                                    size={20}
                                    color={color}
                                />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name='GarbageTimeMatchups'
                        component={GarbageTimeMatchupsStackScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name='trash-can'
                                    size={19}
                                    color={color}
                                />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name='Account'
                        component={AccountScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome
                                    name='gear'
                                    size={18}
                                    color={color}
                                />
                            ),
                        }}
                    />
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
