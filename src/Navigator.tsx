import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useSelector } from 'react-redux';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import { RootState } from './store/rootReducer';
import { resolveAuth } from './auth/store/actionCreators';

import { AuthHomeScreen } from './auth/AuthHomeScreen';
import { SigninScreen } from './auth/SigninScreen';
import { SignupScreen } from './auth/SignupScreen';
import { ForgotPasswordScreen } from './auth/ForgotPasswordScreen';
import { LeaguesScreen } from './leagues/LeaguesScreen';
import { AccountScreen } from './account/AccountScreen';
import { ImportSleeperLeaguesScreen } from './leagues/importLeague/sleeper/ImportSleeperLeaguesScreen';
import { PreloadingDataScreen } from './auth/PreloadingDataScreen';
import { GarbageTimeMatchupsScreen } from './garbageTimeMatchups/GarbageTimeMatchupsScreen';
import { FeedbackScreen } from './feedback/FeedbackScreen';
import { Color } from './common/styles/colors';
import { Icon } from 'react-native-elements';

export type LeaguesStackParamList = {
    Leagues: undefined;
    ImportSleeperLeagues: undefined;
    LeagueHome: { leagueId: string };
};

const Tabs = createBottomTabNavigator();
const AuthStack = createStackNavigator();
const LeaguesStack = createStackNavigator<LeaguesStackParamList>();
const GarbageTimeMatchupsStack = createStackNavigator();
const FeedbackStack = createStackNavigator();
const AccountStack = createStackNavigator();

const GarbageTimeMatchupsStackScreen = () => {
    return (
        <GarbageTimeMatchupsStack.Navigator>
            <GarbageTimeMatchupsStack.Screen
                name="GarbageTimeMatchups"
                options={{
                    headerTitle: 'Compare Teams',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'BebasNeue_400Regular',
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                }}
                component={GarbageTimeMatchupsScreen}
            />
            <GarbageTimeMatchupsStack.Screen
                name="ImportSleeperLeagues"
                options={{
                    headerTitle: 'Add Sleeper League',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'BebasNeue_400Regular',
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                }}
                component={ImportSleeperLeaguesScreen}
            />
        </GarbageTimeMatchupsStack.Navigator>
    );
};

const LeaguesStackScreen = () => {
    return (
        <LeaguesStack.Navigator>
            <LeaguesStack.Screen
                name="Leagues"
                options={{
                    headerTitle: 'Leagues',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'BebasNeue_400Regular',
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                }}
                component={LeaguesScreen}
            />
            <LeaguesStack.Screen
                name="ImportSleeperLeagues"
                options={{
                    headerTitle: 'Add Sleeper League',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'BebasNeue_400Regular',
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                    headerBackTitleVisible: false,
                    headerBackImage: ({ tintColor }) => (
                        <Icon name="chevron-left" size={40} />
                    ),
                }}
                component={ImportSleeperLeaguesScreen}
            />
        </LeaguesStack.Navigator>
    );
};

const FeedbackStackScreen = () => {
    return (
        <FeedbackStack.Navigator>
            <FeedbackStack.Screen
                name="Feedback"
                options={{
                    headerTitle: 'Feedback',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'BebasNeue_400Regular',
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                }}
                component={FeedbackScreen}
            />
        </FeedbackStack.Navigator>
    );
};

const AccountStackScreen = () => {
    return (
        <AccountStack.Navigator>
            <AccountStack.Screen
                name="Account"
                options={{
                    headerTitle: 'Account',
                    headerTitleAlign: 'center',
                    headerTitleStyle: {
                        fontFamily: 'BebasNeue_400Regular',
                        fontSize: 24,
                        color: Color.MainBlack,
                    },
                }}
                component={AccountScreen}
            />
        </AccountStack.Navigator>
    );
};

export const Navigator = () => {
    const [isSyntheticDelayEnabled, setIssyntheticDelayEnabled] = useState(
        true
    );
    const { token, isResolvingAuth, isDataPreloaded } = useSelector(
        (state: RootState) => state.auth
    );
    const dispatch = useDispatch();

    // Checking to see if we have an auth token stored
    useEffect(() => {
        if (isResolvingAuth) {
            dispatch(resolveAuth());
        }
    }, [isResolvingAuth]);

    // If we have an auth token but haven't attempted to fetch user data yet
    useEffect(() => {
        if (token && !isDataPreloaded) {
            setTimeout(() => {
                setIssyntheticDelayEnabled(false);
            }, 1500);
        }
    }, [token]);

    if (isResolvingAuth) {
        return null;
    }

    // If we've authenticated, fetched the user data, and the synthetic delay is done, render the main stack
    if (token && !isSyntheticDelayEnabled && isDataPreloaded) {
        return (
            <NavigationContainer>
                <Tabs.Navigator
                    tabBarOptions={{
                        showLabel: false,
                        activeTintColor: Color.MainBlack,
                        inactiveTintColor: Color.InactiveGray,
                    }}
                >
                    <Tabs.Screen
                        name="Leagues"
                        component={LeaguesStackScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="football-helmet"
                                    size={20}
                                    color={color}
                                />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="GarbageTimeMatchups"
                        component={GarbageTimeMatchupsStackScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="account-switch"
                                    size={19}
                                    color={color}
                                />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="Feedback"
                        component={FeedbackStackScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <MaterialCommunityIcons
                                    name="message-alert"
                                    size={19}
                                    color={color}
                                />
                            ),
                        }}
                    />

                    <Tabs.Screen
                        name="Account"
                        component={AccountStackScreen}
                        options={{
                            tabBarIcon: ({ color, size }) => (
                                <FontAwesome
                                    name="gear"
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

    // If no token, and done trying to resolve auth, render Auth stack
    if (!token && !isResolvingAuth) {
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
    }

    // If we're still trying to determine auth or fetching user data, render a loader
    return <PreloadingDataScreen />;
};
